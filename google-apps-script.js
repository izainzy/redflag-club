// =============================================================
// GOOGLE APPS SCRIPT — Paste this into your Google Sheet's
// Extensions > Apps Script editor, then Deploy as Web App.
//
// Steps:
// 1. Create a Google Sheet named "Red Flag Club Orders"
// 2. Add headers in row 1:
//    Timestamp | Size | Flavor | Toppings | Quantity | Car Plate | Car Type | Car Color | Total
// 3. Go to Extensions > Apps Script
// 4. Delete any existing code and paste this entire file
// 5. Click Deploy > New deployment
// 6. Type: Web app
// 7. Execute as: Me
// 8. Who has access: Anyone
// 9. Click Deploy and copy the URL
// 10. Paste the URL into your .env.local as GOOGLE_SCRIPT_URL
// =============================================================

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.size || "",
    data.flavor || "",
    data.toppings || "",
    data.quantity || 1,
    data.carPlate || "",
    data.carType || "",
    data.carColor || "",
    data.total || 0,
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}
