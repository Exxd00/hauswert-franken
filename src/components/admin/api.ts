export async function adminApi<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { cache: 'no-store', ...init, headers: { 'Content-Type': 'application/json', ...init?.headers } });
  const data = await response.json();
  if (response.status === 401) window.dispatchEvent(new Event('rd-session-expired'));
  if (!response.ok) throw new Error(data.error || 'Die Verbindung ist unterbrochen. Bitte erneut versuchen.');
  return data;
}
export const message = (error: unknown) => error instanceof Error ? error.message : 'Bitte erneut versuchen.';
