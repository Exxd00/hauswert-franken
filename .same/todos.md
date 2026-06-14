# Hauswert Franken (RD Frankenbau) - Todos

## Current Task: Entrümpelung (smart) + Garten service & 2 new before/after projects

- [x] Download curated before/after images (Keller + Garten) into /public/photos
- [x] services.ts: add "Entrümpelung & Räumung" (smart approach) service
- [x] services.ts: add "Gartengestaltung & Außenanlagen" service
- [x] projects.ts: add Keller project (id 4, vorher/nachher + comparison slider)
- [x] projects.ts: add Garten project (id 5, vorher/nachher + comparison slider)
- [x] leistungen/page.tsx: add truck + tree icons for new services
- [x] project-detail: interactive Vorher/Nachher slider (opt-in via beforeAfterPairs)
- [x] CoordinatedServicesSection.tsx: reposition Entrümpelung (now an owned service)
- [x] Lint passes, all routes return 200, images serve correctly

## Notes
- Entrümpelung was previously only a PARTNER coordinated service (Key Clean Service) -> now owned & "smart"
- Project photos are professional PLACEHOLDERS -> user should replace with real photos
- Images live in: /public/photos/projekt-keller/{vorher-*,nachher/*}, /public/photos/projekt-garten/{vorher-*,nachher/*}
