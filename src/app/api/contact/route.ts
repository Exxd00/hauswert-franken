import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const contactEmail = process.env.CONTACT_EMAIL || 'info@rd-frankenbau.de';

interface ContactFormData {
  projektArt: string;
  immobilienTyp: string;
  ort: string;
  objektgroesse: string;
  zeitrahmen: string;
  budgetrahmen: string;
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  nachricht: string;
  fileUrls: string[];
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Generate file preview cards (supports images and PDFs)
    const filePreviewCards = data.fileUrls && data.fileUrls.length > 0
      ? data.fileUrls.map((url: string, i: number) => {
          const isPdf = url.toLowerCase().endsWith('.pdf');
          if (isPdf) {
            return `<div style="display: inline-block; margin: 8px; vertical-align: top;">
              <a href="${url}" target="_blank" style="text-decoration: none;">
                <div style="width: 120px; height: 120px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15); background-color: #fee2e2; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="#dc2626">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM8.5 13h1.7l.8 2.4.8-2.4h1.7l-1.7 4.3L13.5 22h-1.7l-.8-2.3-.8 2.3H8.5l1.7-4.3L8.5 13z"/>
                  </svg>
                  <span style="font-size: 10px; color: #dc2626; margin-top: 4px;">PDF</span>
                </div>
                <p style="margin: 8px 0 0 0; font-size: 12px; color: #78716c; text-align: center;">Dokument ${i + 1}</p>
              </a>
            </div>`;
          }
          return `<div style="display: inline-block; margin: 8px; vertical-align: top;">
            <a href="${url}" target="_blank" style="text-decoration: none;">
              <div style="width: 120px; height: 120px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                <img src="${url}" alt="Bild ${i + 1}" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <p style="margin: 8px 0 0 0; font-size: 12px; color: #78716c; text-align: center;">Bild ${i + 1}</p>
            </a>
          </div>`;
        }).join('')
      : '';

    const emailHtml = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neue Projektanfrage</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f4; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f5f5f4;">
    <tr>
      <td style="padding: 20px 10px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; margin: 0 auto;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); padding: 30px 24px; border-radius: 16px 16px 0 0; text-align: center;">
              <h1 style="margin: 0; color: white; font-size: 24px; font-weight: 700;">
                Neue Projektanfrage
              </h1>
              <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                ${data.projektArt}
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="background-color: white; padding: 0;">

              <!-- Customer Info Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="padding: 24px;">
                <tr>
                  <td>
                    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="padding-bottom: 12px; border-bottom: 1px solid rgba(217, 119, 6, 0.2);">
                            <h2 style="margin: 0; font-size: 18px; color: #92400e;">
                              ${data.vorname} ${data.nachname}
                            </h2>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-top: 12px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                              <tr>
                                <td style="padding: 6px 0;">
                                  <a href="tel:${data.telefon}" style="color: #78350f; text-decoration: none; font-size: 15px; font-weight: 600;">
                                    📞 ${data.telefon}
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 6px 0;">
                                  <a href="mailto:${data.email}" style="color: #78350f; text-decoration: none; font-size: 15px;">
                                    ✉️ ${data.email}
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 6px 0;">
                                  <span style="color: #78350f; font-size: 15px;">
                                    📍 ${data.ort}
                                  </span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Project Details -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="padding: 0 24px 24px 24px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #44403c; font-weight: 600;">
                      Projektdetails
                    </h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-radius: 12px; overflow: hidden; border: 1px solid #e7e5e4;">
                      <tr style="background-color: #fafaf9;">
                        <td style="padding: 14px 16px; border-bottom: 1px solid #e7e5e4; width: 40%;">
                          <span style="color: #78716c; font-size: 13px;">Projekt</span>
                        </td>
                        <td style="padding: 14px 16px; border-bottom: 1px solid #e7e5e4;">
                          <span style="color: #1c1917; font-size: 14px; font-weight: 600;">${data.projektArt}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 16px; border-bottom: 1px solid #e7e5e4;">
                          <span style="color: #78716c; font-size: 13px;">Immobilientyp</span>
                        </td>
                        <td style="padding: 14px 16px; border-bottom: 1px solid #e7e5e4;">
                          <span style="color: #1c1917; font-size: 14px; font-weight: 500;">${data.immobilienTyp}</span>
                        </td>
                      </tr>
                      <tr style="background-color: #fafaf9;">
                        <td style="padding: 14px 16px; border-bottom: 1px solid #e7e5e4;">
                          <span style="color: #78716c; font-size: 13px;">Größe</span>
                        </td>
                        <td style="padding: 14px 16px; border-bottom: 1px solid #e7e5e4;">
                          <span style="color: #1c1917; font-size: 14px; font-weight: 500;">${data.objektgroesse}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 16px; border-bottom: 1px solid #e7e5e4;">
                          <span style="color: #78716c; font-size: 13px;">Budget</span>
                        </td>
                        <td style="padding: 14px 16px; border-bottom: 1px solid #e7e5e4;">
                          <span style="color: #059669; font-size: 14px; font-weight: 600;">${data.budgetrahmen}</span>
                        </td>
                      </tr>
                      <tr style="background-color: #fafaf9;">
                        <td style="padding: 14px 16px;">
                          <span style="color: #78716c; font-size: 13px;">Zeitrahmen</span>
                        </td>
                        <td style="padding: 14px 16px;">
                          <span style="color: #1c1917; font-size: 14px; font-weight: 500;">${data.zeitrahmen}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              ${data.nachricht ? `
              <!-- Message -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="padding: 0 24px 24px 24px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 12px 0; font-size: 16px; color: #44403c; font-weight: 600;">
                      Nachricht
                    </h3>
                    <div style="background-color: #f5f5f4; border-radius: 12px; padding: 16px; border-left: 4px solid #f59e0b;">
                      <p style="margin: 0; color: #44403c; font-size: 14px; white-space: pre-wrap;">
                        ${data.nachricht.replace(/\n/g, '<br>')}
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
              ` : ''}

              ${filePreviewCards ? `
              <!-- Files Section -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="padding: 0 24px 24px 24px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 12px 0; font-size: 16px; color: #44403c; font-weight: 600;">
                      📎 Hochgeladene Dateien (${data.fileUrls.length})
                    </h3>
                    <div style="background-color: #fef3c7; border-radius: 12px; padding: 16px; text-align: center;">
                      ${filePreviewCards}
                      <p style="margin: 16px 0 0 0; font-size: 12px; color: #92400e;">
                        Klicken Sie auf eine Datei, um sie zu öffnen
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Quick Action Buttons -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="padding: 0 24px 32px 24px;">
                <tr>
                  <td style="text-align: center;">
                    <a href="tel:${data.telefon}" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: 600; font-size: 15px; margin: 6px;">
                      📞 Jetzt anrufen
                    </a>
                    <a href="mailto:${data.email}" style="display: inline-block; background-color: #1c1917; color: white; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: 600; font-size: 15px; margin: 6px;">
                      ✉️ E-Mail senden
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1c1917; padding: 24px; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #a8a29e; font-size: 13px;">
                Anfrage erhalten am ${new Date().toLocaleDateString('de-DE', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p style="margin: 0; color: #78716c; font-size: 12px;">
                Gesendet über rd-frankenbau.de
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const { error } = await resend.emails.send({
      from: 'RD Frankenbau <info@rd-frankenbau.de>',
      to: contactEmail,
      replyTo: data.email,
      subject: `🏠 Neue Anfrage: ${data.projektArt} - ${data.vorname} ${data.nachname} (${data.ort})`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
