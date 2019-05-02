// Google script within the registration tracker Sheet that adds new rows based on a public web service call
function doGet(e){
  return handleResponse(e);
}

var SHEET_NAME = "Registrations";
var SCRIPT_PROP = PropertiesService.getScriptProperties();

function handleResponse(e) {
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);
  
  try {
    var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
    var sheet = doc.getSheetByName(SHEET_NAME);
    var headRow = e.parameter.header_row || 1;
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow()+1;
    var row = []; 
    for (i in headers){
      if (headers[i] == "Date"){
        row.push(new Date());
      } else {
        row.push(e.parameter[headers[i]]);
      }
      if (i == 10) {
        break;
      }
    }
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    return ContentService
          .createTextOutput(JSON.stringify({"result":"success", "row": nextRow}))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(e) {
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": e}))
          .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty("key", doc.getId());
}
