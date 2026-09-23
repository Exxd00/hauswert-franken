'use client';

export function ContactFallback({ reset }: { reset: () => void }) {
  return <main data-nosnippet style={{ maxWidth: 720, margin: '10vh auto', padding: 32, fontFamily: 'Arial, sans-serif', color: '#1c1917', background: '#fffbeb', borderRadius: 16 }}>
    <meta name="robots" content="noindex, follow" />
    <p>RD Frankenbau · Sanierung in Nürnberg</p>
    <h1>Wir sind für Ihr Projekt erreichbar.</h1>
    <p>Ein Teil der Seite konnte gerade nicht geladen werden. Bitte laden Sie die Seite erneut oder kontaktieren Sie uns direkt.</p>
    <p><a href="tel:+491742629258">+49 174 2629258</a> · <a href="mailto:info@rd-frankenbau.de">info@rd-frankenbau.de</a></p>
    <p>Wilderstraße 19, 90408 Nürnberg</p>
    <button onClick={reset} style={{ padding: '12px 20px', cursor: 'pointer' }}>Erneut versuchen</button>
  </main>;
}
