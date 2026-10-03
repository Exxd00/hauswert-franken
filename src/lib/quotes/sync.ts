import 'server-only';
import { sign } from 'node:crypto';
import { adminDb } from './db';
import { persistToSheets } from '@/lib/sheets';
import { Quote } from './model';
import { sheetQuote } from './sheet-payload';

export async function syncQuote(quote: Quote): Promise<Quote> {
  if (quote.sheet_synced_version >= quote.version) return quote;
  try {
    const key = process.env.QUOTE_SIGNING_PRIVATE_KEY?.replace(/\\n/g, '\n');
    if (!key) throw new Error('sheet_configuration');
    const quoteJson = JSON.stringify(sheetQuote(quote));
    const receipt = await persistToSheets({ recordType: 'quote', submissionId: quote.id, quoteJson,
      signature: sign('RSA-SHA256', Buffer.from(quoteJson), key).toString('base64'),
    }, quote.id);
    if (typeof receipt.quoteVersion !== 'number' || receipt.quoteVersion < quote.version) throw new Error('sheet_version');
    // Compare-and-set: never mark a newer, unsent edit as synchronized.
    const { error } = await adminDb().from('rd_quotes').update({ sheet_synced_version: quote.version, sheet_error: false }).eq('id', quote.id).eq('version', quote.version);
    if (error) throw error;
    return { ...quote, sheet_synced_version: quote.version, sheet_error: false };
  } catch {
    await adminDb().from('rd_quotes').update({ sheet_error: true }).eq('id', quote.id).eq('version', quote.version);
    return { ...quote, sheet_error: true };
  }
}

export async function syncPending() {
  // Filter in SQL so old unsynchronized offers are not hidden by recent synced ones.
  const { data, error } = await adminDb().rpc('rd_pending_quotes');
  if (error) throw new Error('database_unavailable');
  const results = await Promise.all((data as Quote[]).map(syncQuote));
  return { attempted: results.length, synced: results.filter(q => q.sheet_synced_version >= q.version).length };
}
