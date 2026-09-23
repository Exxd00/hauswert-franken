// Server-only receiver. A 200 response alone is not a persistence receipt.
export async function persistToSheets(payload: Record<string, unknown>, id: string): Promise<Record<string, unknown>> {
  const url = process.env.GOOGLE_SHEETS_URL?.trim();
  if (!url) throw new Error('sheet_unavailable');
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:' || parsed.hostname !== 'script.google.com') throw new Error('sheet_configuration');
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, schemaVersion: 2, source: 'rd-frankenbau.de' }),
        cache: 'no-store', signal: AbortSignal.timeout(12000),
      });
      const receipt = await response.json();
      if (!response.ok || receipt.ok !== true || receipt.id !== id || receipt.schemaVersion !== 2) throw new Error('sheet_not_acknowledged');
      return receipt;
    } catch {
      if (attempt === 1) throw new Error('sheet_unavailable');
    }
  }
  throw new Error('sheet_unavailable');
}
