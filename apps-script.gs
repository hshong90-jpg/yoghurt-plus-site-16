/** Optional Google Apps Script Web App endpoint for the Yoghurt+ static storefront.
 * Orders are unverified submissions. Mark payment status manually after checking funds.
 */
function doPost(e) {
  var data = JSON.parse(e.postData.contents || '{}');
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Orders');
  if (!sheet) throw new Error('Create a sheet tab named Orders first.');
  sheet.appendRow([
    data.id || '', data.date || new Date().toISOString(), data.name || '',
    data.phone || '', data.address || '', data.summary || '', Number(data.total || 0),
    'Pending', data.referral || '', '', 'Receipt requested in WhatsApp', ''
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
