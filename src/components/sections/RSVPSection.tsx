import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info } from 'lucide-react'
import { toast } from 'sonner'
import { AnimatedSection } from '../ui/AnimatedSection'
import { submitRsvp } from '../../utils/submitRsvp'
import type { RsvpFormState, GuestEntry } from '../../types'

const EMPTY_FORM: RsvpFormState = {
  full_name: '',
  email: '',
  attendance: '',
  guest_count: 1,
  guests: [],
  dietary_requirements: '',
  needs_bus: '',
  song_suggestion: '',
  message: '',
  website: '',
}

function buildGuests(count: number, prev: GuestEntry[]): GuestEntry[] {
  const additional = Math.max(0, count - 1)
  return Array.from({ length: additional }, (_, i) => prev[i] ?? { name: '', dietary: '' })
}

export function RSVPSection() {
  const [form, setForm] = useState<RsvpFormState>(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState<'yes' | 'no' | null>(null)

  function setField<K extends keyof RsvpFormState>(key: K, value: RsvpFormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function setGuestField(index: number, field: keyof GuestEntry, value: string) {
    setForm((f) => {
      const guests = [...f.guests]
      guests[index] = { ...guests[index], [field]: value }
      return { ...f, guests }
    })
  }

  function handleGuestCountChange(count: number) {
    setForm((f) => ({ ...f, guest_count: count, guests: buildGuests(count, f.guests) }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.website.trim() !== '') return
    if (form.attendance === 'yes') {
      const missingName = form.guests.some((g) => g.name.trim() === '')
      if (missingName) { toast.error('Please fill in all guest names'); return }
    }
    setSubmitting(true)
    try {
      await submitRsvp(form)
      setSubmitted(form.attendance as 'yes' | 'no')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section id="rsvp" className="py-16 px-6" style={{ backgroundColor: 'rgb(250, 248, 245)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto text-center py-16"
        >
          <p className="font-script text-5xl md:text-6xl mb-6" style={{ color: '#5C2018' }}>
            {submitted === 'yes' ? 'Thank you!' : '💌'}
          </p>
          <p className="font-body text-base leading-relaxed" style={{ color: '#5C2018' }}>
            {submitted === 'yes'
              ? 'We are so happy you will be joining us on this special day. We cannot wait to celebrate with you!'
              : 'We are sorry you cannot make it. We will miss you and hope to celebrate together soon.'}
          </p>
        </motion.div>
      </section>
    )
  }

  const inputClass = 'flex h-10 w-full border px-3 py-2 text-base bg-white/80 rounded-xl focus:outline-none focus:ring-2'
  const inputStyle = { borderColor: 'rgba(92,32,24,0.2)', color: '#5C2018' }
  const labelClass = 'font-body text-xs tracking-widest uppercase mb-2 block font-medium'

  return (
    <section id="rsvp" className="py-16 px-6" style={{ backgroundColor: 'rgb(250, 248, 245)' }}>
      <div className="max-w-xl mx-auto">
        <AnimatedSection
          className="flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full mx-auto w-fit"
          style={{ backgroundColor: 'rgba(92,32,24,0.08)', border: '1px solid rgba(92,32,24,0.15)' } as React.CSSProperties}
        >
          <Info size={14} style={{ color: 'rgba(92,32,24,0.7)' }} />
          <span className="font-body text-xs tracking-wide" style={{ color: 'rgba(92,32,24,0.8)' }}>
            This form is fully customizable to your needs
          </span>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="text-center mb-10">
          <h2 className="font-script text-4xl md:text-5xl mb-2" style={{ color: '#5C2018' }}>
            Confirm your attendance
          </h2>
        </AnimatedSection>

        <AnimatedSection
          delay={0.2}
          className="rounded-2xl p-6 md:p-8 space-y-6"
          style={{ backgroundColor: 'rgba(255,255,255,0.6)', border: '1px solid rgba(92,32,24,0.1)' } as React.CSSProperties}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot */}
            <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
              <input type="text" name="website" tabIndex={-1} autoComplete="off"
                value={form.website} onChange={(e) => setField('website', e.target.value)} />
            </div>

            {/* Full Name */}
            <div>
              <label className={labelClass} htmlFor="full_name" style={{ color: '#5C2018' }}>Full Name *</label>
              <input id="full_name" required placeholder="Your name"
                value={form.full_name} onChange={(e) => setField('full_name', e.target.value)}
                className={inputClass} style={inputStyle} />
            </div>

            {/* Email */}
            <div>
              <label className={labelClass} htmlFor="email" style={{ color: '#5C2018' }}>Email (optional)</label>
              <input type="email" id="email" placeholder="your@email.com"
                value={form.email} onChange={(e) => setField('email', e.target.value)}
                className={inputClass} style={inputStyle} />
            </div>

            {/* Attendance */}
            <div>
              <label className={labelClass} style={{ color: '#5C2018' }}>Will you attend? *</label>
              <div className="flex flex-col gap-2">
                {([['yes', 'Yes, I will attend'], ['no', 'Unfortunately, I cannot attend']] as const).map(([val, label]) => (
                  <label key={val} className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="attendance" value={val}
                      checked={form.attendance === val} onChange={() => setField('attendance', val)}
                      style={{ accentColor: '#5C2018' }} />
                    <span className="font-body text-sm" style={{ color: '#5C2018' }}>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Attending-only fields */}
            <AnimatePresence>
              {form.attendance === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 overflow-hidden"
                >
                  {/* Guest count */}
                  <div>
                    <label className={labelClass} htmlFor="guest_count" style={{ color: '#5C2018' }}>
                      Number of guests (including yourself)
                    </label>
                    <select id="guest_count" value={form.guest_count}
                      onChange={(e) => handleGuestCountChange(Number(e.target.value))}
                      className={inputClass} style={inputStyle}>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>

                  {/* Per-guest rows */}
                  {form.guests.length > 0 && (
                    <div className="space-y-4">
                      <p className={labelClass} style={{ color: '#5C2018' }}>Guest details</p>
                      {form.guests.map((guest, i) => (
                        <div key={i} className="rounded-xl p-4 space-y-3"
                          style={{ backgroundColor: 'rgba(92,32,24,0.04)', border: '1px solid rgba(92,32,24,0.1)' }}>
                          <p className="font-body text-xs tracking-wide font-medium" style={{ color: '#5C2018' }}>
                            Guest {i + 2}
                          </p>
                          <div>
                            <label className={labelClass} style={{ color: '#5C2018' }}>Name *</label>
                            <input required placeholder="Name" value={guest.name}
                              onChange={(e) => setGuestField(i, 'name', e.target.value)}
                              className={inputClass} style={inputStyle} />
                          </div>
                          <div>
                            <label className={labelClass} style={{ color: '#5C2018' }}>Dietary requirements</label>
                            <input placeholder="Any requirements?" value={guest.dietary}
                              onChange={(e) => setGuestField(i, 'dietary', e.target.value)}
                              className={inputClass} style={inputStyle} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Own dietary */}
                  <div>
                    <label className={labelClass} htmlFor="dietary" style={{ color: '#5C2018' }}>
                      Your dietary requirements
                    </label>
                    <input id="dietary" placeholder="Any requirements?"
                      value={form.dietary_requirements}
                      onChange={(e) => setField('dietary_requirements', e.target.value)}
                      className={inputClass} style={inputStyle} />
                  </div>

                  {/* Transport */}
                  <div>
                    <label className={labelClass} style={{ color: '#5C2018' }}>Do you need transport?</label>
                    <p className="font-body text-xs mb-2" style={{ color: 'rgba(92,32,24,0.6)' }}>
                      We have organized transport for guests
                    </p>
                    <div className="flex flex-col gap-2">
                      {([['yes', 'Yes, I need transport'], ['no', 'No, I will make my own way']] as const).map(([val, label]) => (
                        <label key={val} className="flex items-center gap-3 cursor-pointer">
                          <input type="radio" name="needs_bus" value={val}
                            checked={form.needs_bus === val} onChange={() => setField('needs_bus', val)}
                            style={{ accentColor: '#5C2018' }} />
                          <span className="font-body text-sm" style={{ color: '#5C2018' }}>{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Song suggestion */}
            <div>
              <label className={labelClass} htmlFor="song" style={{ color: '#5C2018' }}>Song suggestion</label>
              <p className="font-body text-xs mb-2" style={{ color: 'rgba(92,32,24,0.6)' }}>
                What song would you like to hear at the reception?
              </p>
              <input id="song" placeholder="🎵" value={form.song_suggestion}
                onChange={(e) => setField('song_suggestion', e.target.value)}
                className={inputClass} style={inputStyle} />
            </div>

            {/* Message */}
            <div>
              <label className={labelClass} htmlFor="message" style={{ color: '#5C2018' }}>
                Message for the couple (optional)
              </label>
              <textarea id="message" rows={3} placeholder="..."
                value={form.message} onChange={(e) => setField('message', e.target.value)}
                className="flex w-full border px-3 py-2 text-sm bg-white/80 rounded-xl focus:outline-none focus:ring-2 resize-none"
                style={inputStyle} />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || !form.full_name || !form.attendance}
              className="w-full py-3 rounded-xl font-body text-sm tracking-widest uppercase transition-all duration-200 disabled:opacity-50"
              style={{ backgroundColor: '#5C2018', color: 'white' }}
            >
              {submitting ? 'Sending...' : 'Confirm attendance'}
            </button>
          </form>
        </AnimatedSection>
      </div>
    </section>
  )
}
