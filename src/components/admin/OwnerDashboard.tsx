'use client';
import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Calculator, FolderOpen, Settings2, Shapes, LogOut, ExternalLink, RefreshCw } from 'lucide-react';
import { Brand } from './Brand';
import { CalculatorForm } from './CalculatorForm';
import { SettingsForm } from './SettingsForm';
import { Offers } from './Offers';
import { adminApi, message } from './api';
import { defaultSettings, Quote, Settings } from '@/lib/quotes/model';
const Assets = dynamic(() => import('./Assets'), { loading: () => <p>Website-Material wird geladen …</p> });
type Tab = 'calculator' | 'offers' | 'settings' | 'assets';
const tabs = [{ id: 'calculator', label: 'Rechner', icon: Calculator }, { id: 'offers', label: 'Angebote', icon: FolderOpen }, { id: 'settings', label: 'Einstellungen', icon: Settings2 }, { id: 'assets', label: 'Website', icon: Shapes }] as const;
export function OwnerDashboard() {
  const [tab, setTab] = useState<Tab>('calculator'); const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [version, setVersion] = useState(1); const [ready, setReady] = useState(false); const [error, setError] = useState('');
  const [expired, setExpired] = useState(false); const [quotes, setQuotes] = useState<Quote[]>([]); const [hasMore, setHasMore] = useState(false);
  const [copy, setCopy] = useState<Quote | null>(null); const [copyKey, setCopyKey] = useState(0); const [syncing, setSyncing] = useState(false);
  const [draftDirty, setDraftDirty] = useState(false); const [settingsDirty, setSettingsDirty] = useState(false);
  const refreshOffers = useCallback(async () => { const data = await adminApi<{ quotes: Quote[]; hasMore: boolean }>('/api/admin/quotes'); setQuotes(data.quotes); setHasMore(data.hasMore); }, []);
  const reloadSettings = useCallback(async () => { try { const data = await adminApi<{ settings: Settings; version: number }>('/api/admin/settings'); setSettings(data.settings); setVersion(data.version); setReady(true); setError(''); } catch (e) { setError(message(e)); } }, []);
  useEffect(() => { void reloadSettings(); void refreshOffers().catch(e => setError(message(e))); const handler = () => setExpired(true); window.addEventListener('rd-session-expired', handler); return () => window.removeEventListener('rd-session-expired', handler); }, [reloadSettings, refreshOffers]);
  useEffect(() => { const handler = (e: BeforeUnloadEvent) => { if (draftDirty || settingsDirty) { e.preventDefault(); e.returnValue = ''; } }; window.addEventListener('beforeunload', handler); return () => window.removeEventListener('beforeunload', handler); }, [draftDirty, settingsDirty]);
  const upsert = (quote: Quote) => setQuotes(items => [quote, ...items.filter(q => q.id !== quote.id)].sort((a, b) => b.number - a.number));
  const pending = quotes.filter(q => q.sheet_synced_version < q.version).length;
  const sync = useCallback(async () => { setSyncing(true); try { await adminApi('/api/admin/sync', { method: 'POST' }); await refreshOffers(); } catch (e) { setError(message(e)); } finally { setSyncing(false); } }, [refreshOffers]);
  useEffect(() => { if (!ready) return; void sync(); const handler = () => { void sync(); }; window.addEventListener('online', handler); return () => window.removeEventListener('online', handler); }, [ready, sync]);
  function navigate(next: Tab) { if (tab === 'settings' && next !== tab && settingsDirty && !window.confirm('Ungespeicherte Einstellungen verwerfen?')) return; if (tab === 'settings' && next !== tab) setSettingsDirty(false); setTab(next); }
  return <div className="rd-admin"><header className="rd-topbar"><button type="button" onClick={() => navigate('calculator')} aria-label="RD Frankenbau Verwaltung"><Brand /></button><span className="rd-workspace-label">Verwaltung</span><div className="rd-topbar-actions"><a className="rd-icon-button" href="/" target="_blank" rel="noreferrer" aria-label="Öffentliche Website öffnen"><ExternalLink size={18} /><span>Website öffnen</span></a><button className="rd-icon-button" aria-label="Abmelden" onClick={async () => { if ((draftDirty || settingsDirty) && !window.confirm('Ungespeicherte Änderungen verwerfen und abmelden?')) return; try { await adminApi('/api/admin/session', { method: 'DELETE' }); setDraftDirty(false); setSettingsDirty(false); window.location.reload(); } catch (e) { setError(message(e)); } }}><LogOut size={18} /></button></div></header>
    <div className="rd-shell"><nav className="rd-nav" aria-label="Verwaltung">{tabs.map(item => <button key={item.id} aria-current={tab === item.id ? 'page' : undefined} onClick={() => navigate(item.id)}><item.icon size={19} /><span>{item.label}</span>{item.id === 'offers' && quotes.length > 0 && <small>{quotes.length}{hasMore ? '+' : ''}</small>}</button>)}</nav>
      <main className="rd-main"><div className="rd-page-intro"><div><span className="rd-eyebrow">RD FRANKENBAU · IHR BÜRO</span><h1>{tab === 'calculator' ? 'Ein gutes Angebot beginnt hier.' : tab === 'offers' ? 'Ihre Angebote. An einem Ort.' : tab === 'settings' ? 'Einmal einstellen. Einfach arbeiten.' : 'Alles für Ihren Auftritt.'}</h1><p className="rd-muted">{tab === 'calculator' ? 'Leistungen auswählen, Mengen eintragen und Angebot speichern.' : tab === 'offers' ? 'Gespeicherte Preise bleiben erhalten – auch wenn Sie Ihren Katalog ändern.' : tab === 'settings' ? 'Preise und Firmendaten ändern. Neue Angebote übernehmen die gespeicherten Werte.' : 'Ihr Logo, Ihre Farben und Ihre Projektbilder griffbereit.'}</p></div></div>
      {expired && <div className="rd-alert rd-error" role="alert">Ihre Sitzung ist abgelaufen. Ihre Eingaben bleiben bis zum Neuladen sichtbar. <button className="rd-text-link" onClick={() => window.open('/admin', '_blank')}>In neuem Tab anmelden</button></div>}
      {error && <div className="rd-alert rd-error" role="alert">{error}<button className="rd-text-link" onClick={() => { void reloadSettings(); void refreshOffers().catch(e => setError(message(e))); }}>Erneut laden</button></div>}
      {pending > 0 && <div className="rd-alert rd-warning"><span>{pending} Angebot{pending !== 1 ? 'e' : ''}: In der Datenbank gespeichert. Übertragung an Google Sheets steht aus.</span><button className="rd-text-link" disabled={syncing} onClick={() => void sync()}><RefreshCw size={15} />{syncing ? 'Wird übertragen …' : 'Jetzt übertragen'}</button></div>}
      {tab === 'calculator' && ready && !settings.services.some(s => s.active && s.priceCents !== null) && <div className="rd-alert rd-warning"><span>Willkommen! Hinterlegen Sie zuerst Ihre eigenen Nettopreise. Danach können Sie Angebote erstellen.</span><button className="rd-text-link" onClick={() => navigate('settings')}>Preise einrichten</button></div>}
      <div hidden={tab !== 'calculator'}><CalculatorForm key={copyKey} settings={settings} version={version} ready={ready} initialQuote={copy} onSaved={upsert} onSettings={() => navigate('settings')} onDirty={setDraftDirty} refreshOffers={refreshOffers} /></div>
      {tab === 'offers' && <Offers quotes={quotes} hasMore={hasMore} onUpdate={upsert} onRefresh={refreshOffers} onMore={async () => { const data = await adminApi<{ quotes: Quote[]; hasMore: boolean }>(`/api/admin/quotes?before=${quotes[quotes.length - 1]?.number}`); setQuotes(old => [...old, ...data.quotes.filter(q => !old.some(o => o.id === q.id))]); setHasMore(data.hasMore); }} onNew={() => { if (draftDirty && !window.confirm('Die aktuelle Berechnung verwerfen und ein neues Angebot beginnen?')) return; setCopy(null); setCopyKey(k => k + 1); navigate('calculator'); }} onCopy={quote => { if (draftDirty && !window.confirm('Die aktuelle Berechnung durch eine Kopie ersetzen?')) return; setCopy(quote); setCopyKey(k => k + 1); navigate('calculator'); }} />}
      {tab === 'settings' && !ready && <p>Einstellungen werden geladen …</p>}
      {tab === 'settings' && ready && <SettingsForm settings={settings} version={version} ready={ready} onDirty={setSettingsDirty} onSaved={(s, v) => { setSettings(s); setVersion(v); setSettingsDirty(false); }} />}
      {tab === 'assets' && <Assets />}
      <footer className="rd-footer"><span>RD Frankenbau · Verwaltung</span><a href="https://docs.google.com/spreadsheets/d/13C_KLXECH2R-N1mSf5WT5eWdzPS1Q_WnD1UZrEWJHiU/edit" target="_blank" rel="noreferrer">Google Sheets öffnen <ExternalLink size={13} /></a></footer></main>
    </div></div>;
}
