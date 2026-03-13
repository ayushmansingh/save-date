import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { AnimatedSection } from '../ui/AnimatedSection'
import { ScratchCard } from '../scratch/ScratchCard'
import { ConfettiOverlay } from '../scratch/ConfettiOverlay'

const DATE_PARTS = ['20', 'Nov', '2026'] as const

export function ScratchRevealSection() {
  const [revealedCount, setRevealedCount] = useState(0)
  const [confettiActive, setConfettiActive] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const allRevealed = revealedCount === DATE_PARTS.length

  useEffect(() => {
    if (!sectionRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !allRevealed) {
          document.body.classList.add('scratch-locked')
        } else {
          document.body.classList.remove('scratch-locked')
        }
      },
      { threshold: 0.9 }
    )
    observer.observe(sectionRef.current)
    return () => {
      observer.disconnect()
      document.body.classList.remove('scratch-locked')
    }
  }, [allRevealed])

  useEffect(() => {
    if (allRevealed) {
      document.body.classList.remove('scratch-locked')
      setTimeout(() => setConfettiActive(true), 200)
    }
  }, [allRevealed])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center py-8 px-8"
      style={{ backgroundColor: 'rgb(250, 248, 245)' }}
    >
      <ConfettiOverlay active={confettiActive} />

      <AnimatedSection className="text-center mb-8">
        <h2 className="font-script text-4xl md:text-5xl mb-4" style={{ color: '#5C2018' }}>
          Reveal
        </h2>
        {!allRevealed && (
          <p className="font-body text-sm tracking-[0.15em] uppercase" style={{ color: '#5C2018' }}>
            Scratch to discover the date
          </p>
        )}
      </AnimatedSection>

      {!allRevealed && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1 }}
          className="font-body text-xs tracking-wide mb-6 text-center"
          style={{ color: '#5C2018' }}
        >
          Scratch all three circles to continue
        </motion.p>
      )}

      <div className="flex gap-6 md:gap-10">
        {DATE_PARTS.map((part, i) => (
          <ScratchCard
            key={part}
            revealed={part}
            onReveal={() => setRevealedCount((c) => c + 1)}
            index={i}
          />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={allRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="font-script text-2xl md:text-3xl mt-8"
        style={{ color: '#5C2018' }}
      >
        We're getting married!
      </motion.p>
    </section>
  )
}
