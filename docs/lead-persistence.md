# Contact persistence and measurement

The production repository is `Exxd00/hauswert-franken`, linked to the Vercel project `hauswert-franken` and `rd-frankenbau.de`.

## Contact requests

1. On an explicit, consented submission, save a draft including files in IndexedDB for up to seven days.
2. Send `capture` with a stable submission UUID. The server requires an acknowledged Google Sheets v2 receipt before proceeding.
3. Upload files individually; retain successful upload URLs and failed file names for retry.
4. Send `complete` only after all selected files upload. The server persists the completed request before sending the notification email.
5. Email failure leaves the accepted request in the sheet with `Versandstatus=failed`. Failed sheet persistence returns 503; the browser retains the draft and retries on reconnection or user action.

An internet outage or browser storage removal can prevent delivery; the site does not claim successful submission without a storage acknowledgement. Email failure is visible in the sheet and does not automatically resend mail in the background.

`Sheet1` is the only worksheet. It retains its original A:N columns and customer data. O:X adds the submission UUID, delivery status, update timestamp, attribution, form state, and attachment names. The receiver uses a script lock, stable IDs and exact header checks; it never clears, deletes or sorts existing rows or creates another worksheet. It expands sheet capacity before a write reaches the current row limit. Formula-like input is stored as text.

## Measurement

Optional statistics require consent. GA4 receives event names, service and entry point, not contact fields, message text or files. Form and delivery state are stored on the accepted request's row. Clicks and browsing events stay in GA4 and do not create spreadsheet rows. Phone and email events represent clicks, not completed calls or delivered emails.

The website removes its retired local event queue. `/api/events` and the receiver acknowledge old queued events with `ignored: true` and `storage: analytics_only`; they do not access or recreate an events worksheet. This compatibility response is an explicit retirement, not a claim that the event was durably stored.

GA4 key events: `rd_form_submit_success` (once per event), `rd_phone_click` and `rd_email_click` (once per session), with no invented monetary value. Reloading `/thank-you` does not count another successful submission.

## Receiver deployment and recovery

`scripts/google-sheets-handler.js` is the source for the existing Apps Script deployment. It opens only the fixed production spreadsheet ID. Web app execution requires the Google Sheets OAuth scope; `@OnlyCurrentDoc` and `getActiveSpreadsheet()` cannot be used for the external web app receiver.

Update the existing deployment to a new version so its URL remains unchanged. `GOOGLE_SHEETS_URL` stays server-side in Vercel. Deploy the receiver before the website; it accepts the previous website's payload during the transition. `setupSheet` only fills missing main-sheet headers and preserves existing records. Do not restore receiver versions 2–4: those versions would recreate the retired `Ereignisse` worksheet.

A spreadsheet copy was created before the change on 2026-09-23. Apps Script version 1 and Git commit `887f4cd` remain available for coordinated rollback. Do not point the v2 contact API at the v1 receiver: v2 deliberately rejects unconfirmed saves.

## Verification

- `pnpm build` checks TypeScript, lint and production prerendering.
- `node scripts/test-receiver.cjs` checks preservation, duplicate retries, header mismatch, formula escaping and delivery status.
- `node scripts/test-contact-api.cjs` checks save-before-email, persistence errors, email failure and duplicate delivery.
- Browser failure test: submit with the sheet service unavailable, reload and confirm the draft returns.
- Retired event test: valid old queued events receive an explicit ignored receipt without writing to Sheets.

Google Search Console contained an indexed client-error page. Metadata, address, error handling and crawler files were updated. Request a fresh crawl after publishing; Google controls the timing and exact search snippet.

### Production evidence, 2026-09-23

- Website release `f13c5d6` reached Ready on Vercel, with the new title and address rendered on the production domain and no browser console errors in the checked flow.
- A clearly labelled technical request verified capture, failed file upload and duplicate retry without requesting a notification email. The user subsequently requested removal of the technical request and the separate events worksheet; production checks must leave no test records behind.
- The original customer row, including validation and formatting, matched the pre-change snapshot exactly.
- Google live test reported that the homepage can be indexed. Indexing was requested, and the sitemap was accepted with Success and 5,282 discovered URLs. This is not a guarantee that all URLs will be indexed or that the snippet changes immediately.
