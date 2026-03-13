import { useState, useEffect } from 'react'
import type { CountdownValues } from '../types'

// ── TARGET DATE ────────────────────────────────────────────────────────────
// Change this to the actual wedding date.
export const WEDDING_DATE = new Date('2027-09-10T16:00:00')

function getTimeLeft(target: Date): CountdownValues {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function useCountdown(target: Date = WEDDING_DATE): CountdownValues {
  const [values, setValues] = useState<CountdownValues>(getTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setValues(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return values
}
