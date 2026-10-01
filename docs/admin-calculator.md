# Owner calculator

The existing `/admin` now has four sections: calculator, saved offers, settings, and website assets. No customer login is required. Pricing starts unset deliberately: the public marketing price ranges are not a verified unit-price catalogue. The owner enters actual net prices once in Settings. Unpriced services cannot be used in a saved offer.

## Deployment

- Apply `supabase/migrations/202610010001_admin_quotes.sql` to the existing project. All new tables have RLS enabled and no anonymous/authenticated access. Existing storage and contact tables are not changed.
- Server environment: `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` (32+ characters), `SUPABASE_SERVICE_ROLE_KEY`, `QUOTE_SIGNING_PRIVATE_KEY` (PKCS8 RSA-2048 PEM), `CRON_SECRET`, and the existing `GOOGLE_SHEETS_URL` and `NEXT_PUBLIC_SUPABASE_URL`. Only the existing publishable/anon key belongs in a public variable.
- Set server secrets for Production. Local development uses ignored `.env.local`. Preview branches do not need access to production customer data. Do not commit access files, private keys, or `.env` files.
- The previous admin password was hardcoded publicly. Replace it for launch, keep the replacement in a private owner access file, and never reuse the exposed value. Changing either the password or session secret invalidates sessions.
- Deploy `scripts/google-sheets-handler.js` as a new version of the **existing** Apps Script deployment. It remains backwards compatible with contact and click records. The script contains only the RSA public key. If a signing key is replaced, update `RD_QUOTE_PUBLIC_N` and `scripts/quote-public-key.json` together before switching the server key.
- Vercel runs `/api/admin/sync` daily at 05:00 UTC using `CRON_SECRET`. The owner dashboard also retries pending records on opening/reconnecting and provides a manual retry. Each run processes three pending records; an extended backlog can take several runs.

## Persistence and security

Saving commits a snapshot of company data, prices, quantities, discount, VAT and notes to Supabase before attempting Sheets. A client UUID and input hash prevent duplicate or conflicting saves. Settings use optimistic version checks. Amounts are recomputed on the server and rounded to integer cents; the browser cannot provide trusted totals. Changed catalogue rates never alter saved offers. Copying an offer explicitly uses current catalogue rates.

Every PDF request generates the document, records a unique retrieval event transactionally, then attempts sheet synchronization. Retries with the same event UUID do not increase the counter twice. A PDF retrieval means the server prepared the file for download; it cannot prove a person saved it to disk. PDF documents are generated from the saved snapshot and are not publicly stored.

The `Angebote` tab in the existing `rd-frankenbau.de` spreadsheet is an automatic record of each offer and its latest PDF count. Existing `Sheet1` is retained. Sheets accepts RSA-SHA256 signed records only, rejects formula injection, deduplicates IDs and ignores old versions. Supabase stores synchronization progress so a failed Sheet request cannot lose the offer. The UI distinguishes a saved offer from a synchronized one. Change offer statuses in the admin; editing the sheet does not update the application.

Login uses an eight-hour HttpOnly, SameSite=Strict, Secure-in-production cookie and timing-safe checks. Every admin API checks the session; mutations also check Origin. Login throttling is persisted per hashed IP in Supabase. Admin pages are excluded from indexing and analytics.

## Verification

Run `node scripts/test-quotes.cjs`, the three existing contact/measurement test scripts, `pnpm typecheck`, and `pnpm build`. `scripts/test-admin-integration.cjs` is an explicit manual end-to-end test against a **local server** connected to the configured database and Sheet. It creates a clearly labelled temporary service and offer; inspect the PDF and UI, run it with `--cleanup`, and remove only the matching test row(s) from the Sheet. Do not run this script casually against a working catalogue. The first integration run is recorded in ignored `tmp/rd-admin-qa.json`.

PDF font: static Noto Sans Regular, SIL Open Font License, from `https://github.com/notofonts/noto-fonts/blob/main/hinted/ttf/NotoSans/NotoSans-Regular.ttf`. The licence is bundled in `public/fonts/OFL.txt`. Static fonts avoid missing glyphs caused by subsetting the variable font.
