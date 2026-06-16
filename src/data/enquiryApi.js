// Sends a website form submission to the PHP backend so it shows in the admin
// panel. Returns true on success. In local dev (no PHP) it resolves false but
// never throws, so the form's success UI can still proceed if you want.
const API_URL = '/api/enquiry.php';

export async function submitEnquiry(payload) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return res.ok && data.ok === true;
  } catch {
    return false;
  }
}
