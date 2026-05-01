function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var name = data.name || "";
  var email = data.email;
  var whatsapp = data.whatsapp || "";
  var healthInterest = data.healthInterest || "";
  var source = data.source || "";

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  var emails = sheet.getRange("C2:C" + sheet.getLastRow()).getValues().flat();

  if (emails.indexOf(email) !== -1) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "duplicate" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow([new Date(), name, email, whatsapp, healthInterest, source]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
