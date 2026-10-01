-- Additive migration. Existing website tables and storage policies are unchanged.
begin;
create table if not exists public.rd_admin_settings (
  id boolean primary key default true check (id),
  version integer not null default 1,
  data jsonb not null default '{}'::jsonb
);
insert into public.rd_admin_settings(id) values (true) on conflict do nothing;
create table if not exists public.rd_quotes (
  id uuid primary key,
  number bigint generated always as identity (start with 1001) unique,
  input_hash text not null,
  snapshot jsonb not null,
  status text not null default 'offen' check (status in ('offen','angenommen','abgelehnt','archiviert')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version integer not null default 1,
  pdf_count integer not null default 0,
  last_pdf_at timestamptz,
  sheet_synced_version integer not null default 0,
  sheet_error boolean not null default false
);
create table if not exists public.rd_quote_downloads (
  id uuid primary key, quote_id uuid not null references public.rd_quotes(id) on delete cascade,
  created_at timestamptz not null default now()
);
create table if not exists public.rd_admin_login_buckets (
  key text primary key, attempts integer not null default 1, expires_at timestamptz not null
);
alter table public.rd_admin_settings enable row level security;
alter table public.rd_quotes enable row level security;
alter table public.rd_quote_downloads enable row level security;
alter table public.rd_admin_login_buckets enable row level security;
revoke all on public.rd_admin_settings, public.rd_quotes, public.rd_quote_downloads, public.rd_admin_login_buckets from anon, authenticated;
grant all on public.rd_admin_settings, public.rd_quotes, public.rd_quote_downloads, public.rd_admin_login_buckets to service_role;
grant usage, select on sequence public.rd_quotes_number_seq to service_role;
create index if not exists rd_quotes_created_idx on public.rd_quotes(created_at desc);

create or replace function public.rd_save_quote(p_id uuid, p_snapshot jsonb, p_hash text, p_settings_version integer)
returns jsonb language plpgsql security invoker set search_path = public as $$
declare q public.rd_quotes; current_version integer;
begin
  select * into q from rd_quotes where id = p_id;
  if found then
    if q.input_hash <> p_hash then raise exception 'quote_conflict'; end if;
    return to_jsonb(q) - 'input_hash';
  end if;
  select version into current_version from rd_admin_settings where id = true for share;
  if current_version <> p_settings_version then raise exception 'settings_conflict'; end if;
  insert into rd_quotes(id, snapshot, input_hash) values (p_id, p_snapshot, p_hash) on conflict(id) do nothing;
  select * into q from rd_quotes where id = p_id;
  if q.input_hash <> p_hash then raise exception 'quote_conflict'; end if;
  return to_jsonb(q) - 'input_hash';
end $$;
create or replace function public.rd_record_pdf(p_quote_id uuid, p_event_id uuid)
returns jsonb language plpgsql security invoker set search_path = public as $$
declare q public.rd_quotes; prior uuid; inserted_count integer;
begin
  select * into q from rd_quotes where id = p_quote_id for update;
  if not found then raise exception 'quote_missing'; end if;
  insert into rd_quote_downloads(id, quote_id) values(p_event_id, p_quote_id) on conflict(id) do nothing;
  get diagnostics inserted_count = row_count;
  select quote_id into prior from rd_quote_downloads where id = p_event_id;
  if prior <> p_quote_id then raise exception 'event_conflict'; end if;
  if inserted_count = 1 then
    update rd_quotes set pdf_count = pdf_count + 1, last_pdf_at = now(), updated_at = now(), version = version + 1 where id = p_quote_id returning * into q;
  end if;
  return to_jsonb(q) - 'input_hash';
end $$;
create or replace function public.rd_admin_login_attempt(p_key text)
returns boolean language plpgsql security invoker set search_path = public as $$
declare n integer;
begin
  delete from rd_admin_login_buckets where expires_at < now() - interval '1 day';
  insert into rd_admin_login_buckets(key, attempts, expires_at) values (p_key, 1, now() + interval '15 minutes')
  on conflict(key) do update set attempts = case when rd_admin_login_buckets.expires_at < now() then 1 else rd_admin_login_buckets.attempts + 1 end,
    expires_at = case when rd_admin_login_buckets.expires_at < now() then now() + interval '15 minutes' else rd_admin_login_buckets.expires_at end
  returning attempts into n;
  return n <= 10;
end $$;
revoke all on function public.rd_save_quote(uuid,jsonb,text,integer), public.rd_record_pdf(uuid,uuid), public.rd_admin_login_attempt(text) from public, anon, authenticated;
grant execute on function public.rd_save_quote(uuid,jsonb,text,integer), public.rd_record_pdf(uuid,uuid), public.rd_admin_login_attempt(text) to service_role;
create or replace function public.rd_pending_quotes()
returns setof public.rd_quotes language sql security invoker set search_path = public as $$
  select * from rd_quotes where sheet_synced_version < version order by updated_at asc limit 3;
$$;
revoke all on function public.rd_pending_quotes() from public, anon, authenticated;
grant execute on function public.rd_pending_quotes() to service_role;
commit;
