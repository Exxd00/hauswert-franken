'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import Link from 'next/link';
import { attribution, consentValue, flushEvents, recordEvent, setConsent } from '@/lib/measurement';

export function Measurement() {
  const [consent, setChoice] = useState<string | null>('loading');
  const pathname=usePathname();
  useEffect(() => {
    const update=()=>setChoice(consentValue()); update();
    window.addEventListener('rd-consent',update);
    window.addEventListener('online',flushEvents);
    const timer=setInterval(flushEvents,30000);
    return ()=>{ window.removeEventListener('rd-consent',update); window.removeEventListener('online',flushEvents); clearInterval(timer); };
  },[]);
  useEffect(()=>{
    (window as unknown as Record<string, unknown>)['ga-disable-G-SX3GXK901G'] = consent !== 'yes';
    if(consent!=='yes') return;
    attribution(); void flushEvents();
    window.gtag?.('event','page_view',{page_location:window.location.origin+pathname,page_title:document.title});
    if(pathname.startsWith('/leistung/')) recordEvent('service_view',{service:pathname.split('/').pop()});
    if(pathname.startsWith('/projekt/')) recordEvent('project_view');
    const click=(event: MouseEvent)=>{
      const link=(event.target as Element)?.closest('a'); if(!link) return;
      const href=link.getAttribute('href') || '';
      const entryPoint=link.closest('footer') ? 'footer' : link.closest('nav') ? 'header' : 'page';
      if(href.startsWith('tel:')) recordEvent('phone_click',{entryPoint});
      else if(href.startsWith('mailto:')) recordEvent('email_click',{entryPoint});
      else if(href==='/kontakt' || href==='#kontakt') recordEvent('cta_click',{entryPoint});
    };
    document.addEventListener('click',click);
    return ()=>document.removeEventListener('click',click);
  },[consent,pathname]);
  if(pathname.startsWith('/admin')) return null;
  return <>
    {consent==='yes' && <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-SX3GXK901G" strategy="afterInteractive" />
      <Script id="rd-google-analytics" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','G-SX3GXK901G',{page_location:location.origin+location.pathname});`}</Script>
    </>}
    {consent===null && <aside aria-label="Datenschutzeinstellungen" className="fixed bottom-4 left-4 right-4 sm:left-auto sm:max-w-lg z-[100] rounded-xl border bg-white text-stone-900 p-5 shadow-xl">
      <p className="font-semibold">Ihre Datenschutzeinstellungen</p>
      <p className="text-sm my-2">Mit Ihrer Zustimmung messen wir Besuche und Kontaktaktionen. Anfragen funktionieren auch ohne Statistik. <Link className="underline" href="/datenschutz">Datenschutz</Link></p>
      <div className="flex gap-3"><button className="border rounded px-4 py-2" onClick={()=>setConsent('no')}>Nur notwendige</button><button className="bg-amber-500 rounded px-4 py-2" onClick={()=>setConsent('yes')}>Statistik erlauben</button></div>
    </aside>}
    {consent!==null && consent!=='loading' && <button className="fixed bottom-1 left-2 z-40 text-xs rounded bg-white/90 text-stone-700 px-2 py-1" onClick={()=>setChoice(null)}>Datenschutzeinstellungen</button>}
  </>;
}
