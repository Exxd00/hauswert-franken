import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: 'Datenschutzerklärung von RD Frankenbau. Informationen zum Umgang mit Ihren Daten.',
};

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <h1 className="text-4xl text-primary mb-8">Datenschutzerklärung</h1>

              <h2>1. Datenschutz auf einen Blick</h2>

              <h3>Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
                Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem
                Text aufgeführten Datenschutzerklärung.
              </p>

              <h3>Datenerfassung auf dieser Website</h3>

              <h4>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
              <p>
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
                Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
              </p>

              <h4>Wie erfassen wir Ihre Daten?</h4>
              <p>
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei
                kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
              </p>
              <p>
                Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website
                durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser,
                Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt
                automatisch, sobald Sie diese Website betreten.
              </p>

              <h4>Wofür nutzen wir Ihre Daten?</h4>
              <p>
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
                gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
              </p>

              <h4>Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
              <p>
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und
                Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein
                Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine
                Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung
                jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten
                Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              </p>

              <h2>2. Hosting</h2>
              <p>
                Wir hosten die Inhalte unserer Website bei Netlify Inc., 2325 3rd Street, Suite 215,
                San Francisco, California 94107, USA.
              </p>

              <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>

              <h3>Datenschutz</h3>
              <p>
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
                Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
                Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>

              <h3>Hinweis zur verantwortlichen Stelle</h3>
              <p>
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p>
                RD Frankenbau<br />
                Hans Bunte Straße 26<br />
                90431 Nürnberg<br />
                <br />
                Telefon: +49 174 2629258<br />
                E-Mail: info@rd-frankenbau.de
              </p>

              <h3>Speicherdauer</h3>
              <p>
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt
                wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die
                Datenverarbeitung entfällt.
              </p>

              <h2>4. Datenerfassung auf dieser Website</h2>

              <h3>Kontaktformular</h3>
              <p>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
                Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
                der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
                wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p>
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
                sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung
                vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die
                Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns
                gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung
                (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
              </p>

              <h3>Anfrage per E-Mail, Telefon oder Telefax</h3>
              <p>
                Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive
                aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der
                Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.
              </p>

              <h2>5. Analyse-Tools und Werbung</h2>

              <h3>Google Analytics</h3>
              <p>
                Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist
                die Google Ireland Limited („Google"), Gordon House, Barrow Street, Dublin 4, Irland.
              </p>
              <p>
                Google Analytics ermöglicht es dem Websitebetreiber, das Verhalten der Websitebesucher
                zu analysieren. Die Nutzung erfolgt erst nach Ihrer Einwilligung.
              </p>

              <h2>6. Ihre Rechte</h2>
              <p>
                Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:
              </p>
              <ul>
                <li>Recht auf Auskunft</li>
                <li>Recht auf Berichtigung oder Löschung</li>
                <li>Recht auf Einschränkung der Verarbeitung</li>
                <li>Recht auf Widerspruch gegen die Verarbeitung</li>
                <li>Recht auf Datenübertragbarkeit</li>
              </ul>

              <h2>7. Aktualität und Änderung dieser Datenschutzerklärung</h2>
              <p>
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand April 2024.
              </p>
              <p>
                Durch die Weiterentwicklung unserer Website und Angebote darüber oder aufgrund
                geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden,
                diese Datenschutzerklärung zu ändern.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
