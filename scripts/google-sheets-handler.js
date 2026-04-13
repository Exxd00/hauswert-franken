// =====================================================
// RD FRANKENBAU - GOOGLE SHEETS FORM HANDLER
// Farben: #F59E0B (Amber) | #1C1917 (Dunkel) | #F5F5F4 (Hell)
// Website: rd-frankenbau.de
// =====================================================

/**
 * Hauptfunktion für POST-Anfragen vom Kontaktformular
 */
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Sicherstellen, dass die Kopfzeile existiert
    ensureHeaders(sheet);

    // Datenzeile erstellen
    var row = [
      Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd.MM.yyyy HH:mm:ss"), // Datum
      "🆕 Neu",                                // Status
      data.projektArt || "",                   // Projekt
      data.immobilienTyp || "",                // Immobilientyp
      data.ort || "",                          // Ort
      data.objektgroesse || "",                // Größe
      data.budgetrahmen || "",                 // Budget
      data.zeitrahmen || "",                   // Zeitrahmen
      data.vorname || "",                      // Vorname
      data.nachname || "",                     // Nachname
      data.email || "",                        // E-Mail
      data.telefon || "",                      // Telefon
      data.nachricht || "",                    // Nachricht
      formatFileUrls(data.fileUrls)            // Dateien
    ];

    // Zeile nach den Kopfzeilen hinzufügen
    sheet.appendRow(row);
    var lastRow = sheet.getLastRow();

    // Status-Dropdown hinzufügen
    addStatusDropdown(sheet, lastRow);

    // Neue Zeile hervorheben
    highlightNewRow(sheet, lastRow);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: lastRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// =====================================================
// Kopfzeilen sicherstellen
// =====================================================
function ensureHeaders(sheet) {
  var a1 = sheet.getRange("A1").getValue();
  var b1 = sheet.getRange("B1").getValue();

  if (a1 !== "Datum" || b1 !== "Status") {
    sheet.clear();
    createHeaders(sheet);
  }
}

// =====================================================
// Kopfzeilen mit Formatierung erstellen
// =====================================================
function createHeaders(sheet) {
  var headers = [
    "Datum",
    "Status",
    "Projekt",
    "Immobilientyp",
    "Ort",
    "Größe (m²)",
    "Budget",
    "Zeitrahmen",
    "Vorname",
    "Nachname",
    "E-Mail",
    "Telefon",
    "Nachricht",
    "Dateien"
  ];

  // Kopfzeile setzen
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Formatierung der Kopfzeile
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#F59E0B");
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");

  // Erste Zeile einfrieren
  sheet.setFrozenRows(1);

  // Spaltenbreiten anpassen
  sheet.setColumnWidth(1, 160);   // Datum
  sheet.setColumnWidth(2, 140);   // Status
  sheet.setColumnWidth(3, 180);   // Projekt
  sheet.setColumnWidth(4, 140);   // Immobilientyp
  sheet.setColumnWidth(5, 120);   // Ort
  sheet.setColumnWidth(6, 100);   // Größe
  sheet.setColumnWidth(7, 150);   // Budget
  sheet.setColumnWidth(8, 150);   // Zeitrahmen
  sheet.setColumnWidth(9, 120);   // Vorname
  sheet.setColumnWidth(10, 120);  // Nachname
  sheet.setColumnWidth(11, 200);  // E-Mail
  sheet.setColumnWidth(12, 140);  // Telefon
  sheet.setColumnWidth(13, 300);  // Nachricht
  sheet.setColumnWidth(14, 250);  // Dateien

  // Zeilenhöhe für Kopfzeile
  sheet.setRowHeight(1, 35);
}

// =====================================================
// Status-Dropdown hinzufügen
// =====================================================
function addStatusDropdown(sheet, row) {
  var statusCell = sheet.getRange(row, 2);

  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "🆕 Neu",
      "📞 Kontaktiert",
      "📅 Termin vereinbart",
      "🔍 Besichtigung",
      "💰 Angebot erstellt",
      "✅ Auftrag erhalten",
      "🚧 In Arbeit",
      "✔️ Abgeschlossen",
      "❌ Abgesagt"
    ], true)
    .setAllowInvalid(false)
    .build();

  statusCell.setDataValidation(rule);
}

// =====================================================
// Neue Zeile hervorheben
// =====================================================
function highlightNewRow(sheet, row) {
  var range = sheet.getRange(row, 1, 1, sheet.getLastColumn());
  range.setBackground("#FFFBEB");
  range.setVerticalAlignment("middle");
}

// =====================================================
// Zeile automatisch einfärben bei Statusänderung
// =====================================================
function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var range = e.range;

  // Nur wenn Status-Spalte (B) bearbeitet wird und nicht Kopfzeile
  if (range.getColumn() !== 2 || range.getRow() <= 1) return;

  var status = range.getValue();
  var rowRange = sheet.getRange(range.getRow(), 1, 1, sheet.getLastColumn());

  switch (status) {
    case "🆕 Neu":
      rowRange.setBackground("#FFFBEB");      // Gelb-hell
      break;
    case "📞 Kontaktiert":
      rowRange.setBackground("#E0F2FE");      // Blau-hell
      break;
    case "📅 Termin vereinbart":
      rowRange.setBackground("#DCFCE7");      // Grün-hell
      break;
    case "🔍 Besichtigung":
      rowRange.setBackground("#F3E8FF");      // Lila-hell
      break;
    case "💰 Angebot erstellt":
      rowRange.setBackground("#FEF3C7");      // Amber-hell
      break;
    case "✅ Auftrag erhalten":
      rowRange.setBackground("#D1FAE5");      // Emerald-hell
      break;
    case "🚧 In Arbeit":
      rowRange.setBackground("#FFEDD5");      // Orange-hell
      break;
    case "✔️ Abgeschlossen":
      rowRange.setBackground("#BBF7D0");      // Grün
      break;
    case "❌ Abgesagt":
      rowRange.setBackground("#FECACA");      // Rot-hell
      break;
    default:
      rowRange.setBackground("#FFFFFF");
  }
}

// =====================================================
// Datei-URLs formatieren
// =====================================================
function formatFileUrls(fileUrls) {
  if (!fileUrls || fileUrls.length === 0) {
    return "Keine";
  }

  return fileUrls.map(function(url, index) {
    return (index + 1) + ". " + url;
  }).join("\n");
}

// =====================================================
// GET-Test-Anfrage
// =====================================================
function doGet(e) {
  return ContentService
    .createTextOutput("✅ RD Frankenbau API ist aktiv!")
    .setMimeType(ContentService.MimeType.TEXT);
}

// =====================================================
// Manuell Kopfzeilen erstellen (erste Ausführung)
// =====================================================
function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  createHeaders(sheet);
  Logger.log("✅ Tabelle wurde erfolgreich eingerichtet!");
}

// =====================================================
// Kopfzeilen zurücksetzen
// =====================================================
function resetHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  createHeaders(sheet);
  Logger.log("✅ Kopfzeilen wurden zurückgesetzt!");
}

// =====================================================
// Test-Daten hinzufügen (für Tests)
// =====================================================
function addTestData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  ensureHeaders(sheet);

  var testRow = [
    Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd.MM.yyyy HH:mm:ss"),
    "🆕 Neu",
    "Kernsanierung",
    "Wohnung",
    "Nürnberg",
    "100 - 150 m²",
    "50.000 - 100.000 €",
    "So schnell wie möglich",
    "Max",
    "Mustermann",
    "test@example.de",
    "+49 176 12345678",
    "Dies ist eine Testanfrage für eine Komplettsanierung meiner Wohnung.",
    "Keine"
  ];

  sheet.appendRow(testRow);
  var lastRow = sheet.getLastRow();
  addStatusDropdown(sheet, lastRow);
  highlightNewRow(sheet, lastRow);

  Logger.log("✅ Testdaten wurden hinzugefügt!");
}

// =====================================================
// Statistiken abrufen
// =====================================================
function getStatistics() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();

  var stats = {
    total: data.length - 1, // Minus Kopfzeile
    neu: 0,
    kontaktiert: 0,
    terminVereinbart: 0,
    besichtigung: 0,
    angebotErstellt: 0,
    auftragErhalten: 0,
    inArbeit: 0,
    abgeschlossen: 0,
    abgesagt: 0
  };

  for (var i = 1; i < data.length; i++) {
    var status = data[i][1];

    if (status.includes("Neu")) stats.neu++;
    else if (status.includes("Kontaktiert")) stats.kontaktiert++;
    else if (status.includes("Termin")) stats.terminVereinbart++;
    else if (status.includes("Besichtigung")) stats.besichtigung++;
    else if (status.includes("Angebot")) stats.angebotErstellt++;
    else if (status.includes("Auftrag")) stats.auftragErhalten++;
    else if (status.includes("Arbeit")) stats.inArbeit++;
    else if (status.includes("Abgeschlossen")) stats.abgeschlossen++;
    else if (status.includes("Abgesagt")) stats.abgesagt++;
  }

  Logger.log("📊 Statistiken:");
  Logger.log("Gesamt: " + stats.total);
  Logger.log("Neu: " + stats.neu);
  Logger.log("Kontaktiert: " + stats.kontaktiert);
  Logger.log("Termin vereinbart: " + stats.terminVereinbart);
  Logger.log("Besichtigung: " + stats.besichtigung);
  Logger.log("Angebot erstellt: " + stats.angebotErstellt);
  Logger.log("Auftrag erhalten: " + stats.auftragErhalten);
  Logger.log("In Arbeit: " + stats.inArbeit);
  Logger.log("Abgeschlossen: " + stats.abgeschlossen);
  Logger.log("Abgesagt: " + stats.abgesagt);

  return stats;
}

// =====================================================
// Projekt-Übersicht nach Art
// =====================================================
function getProjectsByType() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();

  var types = {};

  for (var i = 1; i < data.length; i++) {
    var projektArt = data[i][2] || "Unbekannt";
    types[projektArt] = (types[projektArt] || 0) + 1;
  }

  Logger.log("📈 Projekte nach Art:");
  for (var type in types) {
    Logger.log(type + ": " + types[type]);
  }

  return types;
}
