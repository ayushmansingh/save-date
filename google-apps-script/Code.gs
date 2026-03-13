/**
 * Wedding RSVP — Google Apps Script Web App
 *
 * Setup:
 *  1. Open https://script.google.com and create a new project
 *  2. Paste this file as Code.gs
 *  3. Click Deploy → New deployment → Web App
 *     - Execute as: Me
 *     - Who has access: Anyone
 *  4. Copy the deployment URL into your .env as VITE_SHEETS_WEBHOOK_URL
 *  5. In your Google Sheet, rename the first sheet to "RSVPs"
 */

var SHEET_NAME = 'RSVPs';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return error('Sheet "' + SHEET_NAME + '" not found. Create it first.');
    }

    var data = JSON.parse(e.postData.contents);

    // ── Honeypot check ───────────────────────────────────────────────────────
    if (data.website && data.website.trim() !== '') {
      // Silently discard bot submissions
      return ok();
    }

    // ── Add header row if sheet is empty ─────────────────────────────────────
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Full Name',
        'Email',
        'Attendance',
        'Guest Count',
        'Per-Guest Details',
        'Own Dietary',
        'Needs Bus',
        'Song Suggestion',
        'Message'
      ]);
      // Freeze header row
      sheet.setFrozenRows(1);
      // Bold the header
      sheet.getRange(1, 1, 1, 10).setFontWeight('bold');
    }

    // ── Append RSVP row ───────────────────────────────────────────────────────
    sheet.appendRow([
      new Date().toISOString(),
      data.full_name        || '',
      data.email            || '',
      data.attendance       || '',
      data.guest_count      || 1,
      data.guests_detail    || '',
      data.dietary_requirements || '',
      data.needs_bus        || '',
      data.song_suggestion  || '',
      data.message          || ''
    ]);

    return ok();

  } catch (err) {
    return error(err.message);
  } finally {
    lock.releaseLock();
  }
}

// Health-check endpoint (GET)
function doGet() {
  return ok();
}

function ok() {
  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function error(msg) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: false, error: msg }))
    .setMimeType(ContentService.MimeType.JSON);
}
