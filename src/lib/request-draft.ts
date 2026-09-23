// IndexedDB retains files as well as fields after a failed, explicitly submitted request.
export interface RequestDraft<T = Record<string, unknown>> {
  id: string; savedAt: number; fields: T; files: File[]; uploaded: Record<string, string>;
}
let memory: RequestDraft | null = null;
async function database(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('rd-frankenbau-anfrage', 1);
    req.onupgradeneeded = () => req.result.createObjectStore('drafts');
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
export async function saveDraft<T>(draft: RequestDraft<T>): Promise<boolean> {
  memory = draft as RequestDraft;
  try {
    const db = await database();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction('drafts', 'readwrite');
      tx.objectStore('drafts').put(draft, 'pending');
      tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error); tx.onabort = () => reject(tx.error);
    });
    db.close(); return true;
  } catch { return false; }
}
export async function readDraft<T>(): Promise<RequestDraft<T> | null> {
  try {
    const db = await database();
    const draft = await new Promise<RequestDraft<T> | null>((resolve, reject) => {
      const req = db.transaction('drafts').objectStore('drafts').get('pending');
      req.onsuccess = () => resolve(req.result || null); req.onerror = () => reject(req.error);
    });
    db.close();
    if (draft && Date.now() - draft.savedAt > 7 * 86400000) { await clearDraft(); return null; }
    return draft;
  } catch { return memory as RequestDraft<T> | null; }
}
export async function clearDraft(): Promise<void> {
  memory = null;
  try {
    const db = await database();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction('drafts', 'readwrite'); tx.objectStore('drafts').delete('pending');
      tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch { /* Browser may not support persistent storage. */ }
}
