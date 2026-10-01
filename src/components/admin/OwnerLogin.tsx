'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Eye, EyeOff, LockKeyhole } from 'lucide-react';
import { Brand } from './Brand';
export function OwnerLogin() {
  const [password, setPassword] = useState(''); const [visible, setVisible] = useState(false);
  const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  return <main className="rd-admin rd-login"><div className="rd-login-card"><Brand /><span className="rd-eyebrow">IHR ARBEITSPLATZ</span><h1>Alles für Ihr<br />nächstes Angebot.</h1><p className="rd-muted">Kalkulieren, als PDF speichern und den Überblick behalten.</p>
    <form onSubmit={async event => { event.preventDefault(); setBusy(true); setError(''); try { const response = await fetch('/api/admin/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error); window.location.reload(); } catch (e) { setError(e instanceof Error ? e.message : 'Verbindung fehlgeschlagen.'); setBusy(false); } }}>
      <label className="rd-field">Passwort<div className="rd-password"><input autoComplete="current-password" type={visible ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required autoFocus /><button type="button" aria-label={visible ? 'Passwort verbergen' : 'Passwort anzeigen'} onClick={() => setVisible(!visible)}>{visible ? <EyeOff size={20} /> : <Eye size={20} />}</button></div></label>
      {error && <p className="rd-alert rd-error" role="alert">{error}</p>}
      <button className="rd-button rd-primary rd-full" disabled={busy}>{busy ? 'Anmeldung …' : 'Anmelden'}<ArrowRight size={18} /></button>
    </form><p className="rd-login-foot"><LockKeyhole size={15} /> Geschützter Bereich für die Geschäftsführung</p><Link href="/" className="rd-text-link">Zur Website</Link></div><div className="rd-login-art" aria-hidden="true"><div className="rd-house-outline" /><div><span>RD FRANKENBAU</span><p>Gute Arbeit.<br />Klar kalkuliert.</p><small>NÜRNBERG & FRANKEN</small></div></div></main>;
}
