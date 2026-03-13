export type Language = 'en' | 'it'

export interface CountdownValues {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export interface GuestEntry {
  name: string
  dietary: string
}

export interface RsvpFormState {
  full_name: string
  email: string
  attendance: 'yes' | 'no' | ''
  guest_count: number
  guests: GuestEntry[]          // per-guest rows for guests 2..N
  dietary_requirements: string  // own dietary
  needs_bus: 'yes' | 'no' | ''
  song_suggestion: string
  message: string
  website: string               // honeypot — must always be empty
}

export interface ConfettiParticle {
  id: string
  x: number        // left % 0–100
  delay: number    // animation delay in seconds
  duration: number // fall duration in seconds
  size: number     // px
  shape: 'circle' | 'square' | 'rectangle'
}
