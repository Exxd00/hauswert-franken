// RD Frankenbau receiver v2. Never clears, deletes, sorts or replaces existing data.
var RD_SHEET_ID = '13C_KLXECH2R-N1mSf5WT5eWdzPS1Q_WnD1UZrEWJHiU';
var RD_HEADERS = ['Datum','Status','Projekt','Immobilientyp','Ort','Größe (m²)','Budget','Zeitrahmen','Vorname','Nachname','E-Mail','Telefon','Nachricht','Dateien','Anfrage-ID','Versandstatus','Aktualisiert','Quelle','Medium','Kampagne','Einstiegsseite','Formularstatus','Angefügte Dateinamen','Fehlgeschlagene Dateien','Datensatztyp','Kontaktaktion','Seite','Bereich','Ziel','Ereignis-ID'];
var RD_EVENTS = ['form_start','service_select','form_submit_attempt','form_submit_success','form_submit_error','upload_error','phone_click','email_click','cta_click','thank_you_page','service_view','project_view'];

function rdJson_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
function rdCell_(value) { var s = String(value == null ? '' : value).slice(0,10000); return /^[=+\-@\t\r]/.test(s) ? "'" + s : s; }
function rdDate_(value) { return Utilities.formatDate(value ? new Date(value) : new Date(), 'Europe/Berlin', 'dd.MM.yyyy HH:mm:ss'); }
function rdId_(id) { return typeof id === 'string' && /^[a-zA-Z0-9:_-]{16,100}$/.test(id); }
function rdAck_(id, duplicate, status) { return rdJson_({ok:true, success:true, schemaVersion:2, id:id, duplicate:duplicate, emailStatus:status || ''}); }
function rdEnsureRow_(sheet, row) {
  var capacity = sheet.getMaxRows();
  if (row > capacity) sheet.insertRowsAfter(capacity, Math.max(100, row-capacity));
}
function rdFind_(sheet, column, id) {
  if (sheet.getLastRow() < 2) return 0;
  var found = sheet.getRange(2,column,sheet.getLastRow()-1,1).createTextFinder(id).matchEntireCell(true).findNext();
  return found ? found.getRow() : 0;
}
function rdHeaders_(sheet, headers) {
  if (sheet.getMaxColumns() < headers.length) sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length-sheet.getMaxColumns());
  var current = sheet.getRange(1,1,1,headers.length).getValues()[0];
  // Refuse incompatible schemas; never reset the user's spreadsheet.
  for (var i=0; i<headers.length; i++) {
    if (current[i] && current[i] !== headers[i]) throw new Error('header_mismatch');
  }
  for (var j=0; j<headers.length; j++) if (!current[j]) sheet.getRange(1,j+1).setValue(headers[j]);
  sheet.getRange(1,1,1,headers.length).setBackground('#1C1917').setFontColor('#FFFFFF').setFontWeight('bold').setWrap(true);
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1,42);
}
function rdSheets_() {
  // Web-app executions have no active container; always use the fixed target ID.
  var book = SpreadsheetApp.openById(RD_SHEET_ID);
  if (!book || book.getId() !== RD_SHEET_ID) throw new Error('unexpected_spreadsheet');
  var leads = book.getSheetById(0);
  if (!leads) throw new Error('lead_sheet_missing');
  rdHeaders_(leads, RD_HEADERS);
  return {leads:leads};
}
function rdClick_(sheet,data) {
  var id=data.eventId;
  var existing=rdFind_(sheet,30,id);
  if (!existing) {
    var phone=data.eventName === 'phone_click';
    var a=data.attribution || {};
    var row=new Array(RD_HEADERS.length).fill('');
    row[0]=rdDate_(data.occurredAt); row[1]=phone ? '📞 Telefon-Klick' : '✉️ E-Mail-Klick';
    row[2]=data.service || ''; row[16]=rdDate_();
    row[17]=a.utmSource; row[18]=a.utmMedium; row[19]=a.utmCampaign; row[20]=a.landingPath;
    row[24]='Kontaktklick'; row[25]=phone ? 'Telefon' : 'E-Mail';
    row[26]=String(data.path || '').split(/[?#]/)[0]; row[27]=data.entryPoint || '';
    // Only the public company contact target; never a visitor's contact details.
    row[28]=phone ? '+49 174 2629258' : 'info@rd-frankenbau.de'; row[29]=id;
    var rowNumber=sheet.getLastRow()+1;
    rdEnsureRow_(sheet,rowNumber);
    sheet.getRange(rowNumber,2).clearDataValidations();
    sheet.getRange(rowNumber,29,1,2).setNumberFormat('@');
    sheet.getRange(rowNumber,1,1,row.length).setValues([row.map(rdCell_)]).setVerticalAlignment('top').setWrap(true).setBackground('#EFF6FF');
    SpreadsheetApp.flush();
  }
  return rdJson_({ok:true,success:true,schemaVersion:2,id:id,duplicate:Boolean(existing),storage:'main_sheet'});
}
function doPost(e) {
  var lock;
  try {
    var raw = (e && e.postData && e.postData.contents) || '{}';
    if (raw.length > 40000) return rdJson_({ok:false,error:'payload_too_large'});
    var data=JSON.parse(raw);
    // Compatibility for the previous website during the deployment transition.
    var legacy = !data.schemaVersion && !data.recordType && typeof data.email === 'string' && data.projektArt;
    if (legacy) { data.submissionId=Utilities.getUuid(); data.phase='complete'; data.recordType='lead'; data.consent=true; }
    else if (data.schemaVersion !== 2 || data.source !== 'rd-frankenbau.de') return rdJson_({ok:false,error:'invalid_source'});
    var id=data.recordType === 'event' ? data.eventId : data.submissionId;
    if (!rdId_(id)) return rdJson_({ok:false,error:'invalid_id'});
    if (['lead','event','delivery'].indexOf(data.recordType) < 0) return rdJson_({ok:false,error:'invalid_type'});
    // New contact clicks share the main sheet; legacy and other events stay retired.
    if (data.recordType === 'event') {
      if (RD_EVENTS.indexOf(data.eventName) < 0) return rdJson_({ok:false,error:'invalid_event'});
      if (['phone_click','email_click'].indexOf(data.eventName) < 0 || !data.occurredAt) return rdJson_({ok:true,success:true,schemaVersion:2,id:id,ignored:true,storage:'analytics_only'});
      var time=Date.parse(data.occurredAt);
      if (!isFinite(time) || time < Date.now()-7*86400000 || time > Date.now()+300000 || typeof data.path !== 'string' || data.path.charAt(0) !== '/' || data.path.length > 300) return rdJson_({ok:false,error:'invalid_click'});
    }
    if (data.recordType === 'lead' && (data.consent !== true || !data.vorname || !data.email || !data.telefon || !data.ort || !data.projektArt || ['capture','complete','upload_failed'].indexOf(data.phase) < 0)) return rdJson_({ok:false,error:'invalid_lead'});
    lock=LockService.getScriptLock();
    if (!lock.tryLock(10000)) return rdJson_({ok:false,error:'busy'});
    var sheets=rdSheets_();
    var sheet=sheets.leads;
    if (data.recordType === 'event') return rdClick_(sheet,data);
    var rowNumber=rdFind_(sheet,15,id);
    if (data.recordType === 'delivery') {
      if (!rowNumber || ['sent','failed'].indexOf(data.emailStatus) < 0) return rdJson_({ok:false,error:'invalid_delivery'});
      // A late failed retry must never replace an already confirmed delivery.
      if (sheet.getRange(rowNumber,16).getValue() !== 'sent') sheet.getRange(rowNumber,16).setValue(data.emailStatus);
      sheet.getRange(rowNumber,17).setValue(rdDate_());
      SpreadsheetApp.flush();
      return rdAck_(id,true,sheet.getRange(rowNumber,16).getValue());
    }
    var existed=Boolean(rowNumber);
    var previous=existed ? sheet.getRange(rowNumber,1,1,RD_HEADERS.length).getValues()[0] : [];
    // Repeated capture requests do not overwrite a completed or partially uploaded record.
    if (existed && data.phase === 'capture') return rdAck_(id,true,previous[15]);
    if (existed && previous[21] === 'complete' && data.phase !== 'complete') return rdAck_(id,true,previous[15]);
    var a=data.attribution || {};
    var files=Array.isArray(data.fileUrls) ? data.fileUrls.slice(0,5).join('\n') : '';
    var row=[previous[0] || rdDate_(),previous[1] || '🆕 Neu',data.projektArt,data.immobilienTyp,data.ort,data.objektgroesse,data.budgetrahmen,data.zeitrahmen,data.vorname,data.nachname,data.email,data.telefon,data.nachricht,files || previous[13] || 'Keine',id,previous[15] || 'pending',rdDate_(),a.utmSource,a.utmMedium,a.utmCampaign,a.landingPath,data.phase,(data.fileNames || []).join('\n'),(data.failedFiles || []).join('\n'),'Anfrage','','','','',''].map(rdCell_);
    rowNumber=rowNumber || sheet.getLastRow()+1;
    rdEnsureRow_(sheet,rowNumber);
    sheet.getRange(rowNumber,12).setNumberFormat('@');
    sheet.getRange(rowNumber,1,1,row.length).setValues([row]).setVerticalAlignment('top').setWrap(true);
    if (!existed) {
      sheet.getRange(rowNumber,1,1,row.length).setBackground('#FFFBEB');
      var rule=SpreadsheetApp.newDataValidation().requireValueInList(['🆕 Neu','📞 Kontaktiert','📅 Termin vereinbart','🔍 Besichtigung','💰 Angebot erstellt','✅ Auftrag erhalten','🚧 In Arbeit','✔️ Abgeschlossen','❌ Abgesagt'],true).setAllowInvalid(false).build();
      sheet.getRange(rowNumber,2).setDataValidation(rule);
    }
    SpreadsheetApp.flush();
    return rdAck_(id,existed,row[15]);
  } catch (error) {
    return rdJson_({ok:false,error:'receiver_error'});
  } finally { if (lock && lock.hasLock()) lock.releaseLock(); }
}
function doGet() { return rdJson_({ok:true, service:'rd-frankenbau.de', schemaVersion:2}); }
function setupSheet() {
  var lock=LockService.getScriptLock(); lock.waitLock(10000);
  try {
    var sheets=rdSheets_();
    sheets.leads.setColumnWidths(15,10,170);
    sheets.leads.setColumnWidths(25,6,180);
    sheets.leads.setColumnWidth(29,230);
    SpreadsheetApp.flush();
  } finally { lock.releaseLock(); }
}
function onEdit(e) {
  if (!e || e.range.getSheet().getSheetId() !== 0 || e.range.getColumn() !== 2 || e.range.getRow() < 2) return;
  var colors={'🆕 Neu':'#FFFBEB','📞 Kontaktiert':'#E0F2FE','📅 Termin vereinbart':'#DCFCE7','🔍 Besichtigung':'#F3E8FF','💰 Angebot erstellt':'#FEF3C7','✅ Auftrag erhalten':'#D1FAE5','🚧 In Arbeit':'#FFEDD5','✔️ Abgeschlossen':'#BBF7D0','❌ Abgesagt':'#FECACA'};
  e.range.getSheet().getRange(e.range.getRow(),1,1,RD_HEADERS.length).setBackground(colors[e.range.getValue()] || '#FFFFFF');
}
