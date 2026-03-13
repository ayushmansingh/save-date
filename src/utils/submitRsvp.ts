import type { RsvpFormState } from '../types'

const WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL as string | undefined

export async function submitRsvp(data: RsvpFormState): Promise<void> {
  if (!WEBHOOK_URL) {
    // Dev mode: log the payload and pretend success
    console.info('[submitRsvp] No webhook URL set. Payload:', data)
    return
  }

  // Serialize per-guest rows into a readable string for the Sheet column
  const guestsDetail = data.guests
    .map((g, i) => `Guest ${i + 2}: ${g.name}${g.dietary ? ` (${g.dietary})` : ''}`)
    .join(' | ')

  const payload = {
    full_name: data.full_name,
    email: data.email,
    attendance: data.attendance,
    guest_count: data.guest_count,
    guests_detail: guestsDetail,
    dietary_requirements: data.dietary_requirements,
    needs_bus: data.needs_bus,
    song_suggestion: data.song_suggestion,
    message: data.message,
    website: data.website, // honeypot — always empty for real users
  }

  // Apps Script Web Apps don't send CORS headers on POST.
  // Using no-cors gives an opaque response (we can't read it),
  // but the script still executes and writes the row.
  await fetch(WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}
