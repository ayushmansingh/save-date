import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { AnimatedSection } from '../ui/AnimatedSection'
import { ScratchCard } from '../scratch/ScratchCard'
import { ConfettiOverlay } from '../scratch/ConfettiOverlay'

const DATE_PARTS = ['10', 'Sept', '2027'] as const

export function ScratchRevealSection() {
  const { t } = useLanguage()
  const [revealedCount, setRevealedCount] = useState(0)
  const [confettiActive, setConfettiActive] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const allRevealed = revealedCount === DATE_PARTS.length

  // Scroll-lock while section is in view and not fully revealed
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

  // Remove scroll lock when all revealed
  useEffect(() => {
    if (allRevealed) {
      document.body.classList.remove('scratch-locked')
      setTimeout(() => setConfettiActive(true), 200)
    }
  }, [allRevealed])

  function handleReveal() {
    setRevealedCount((c) => c + 1)
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center py-8 px-8"
      style={{ backgroundColor: 'rgb(250, 248, 245)' }}
    >
      <ConfettiOverlay active={confettiActive} />

      <AnimatedSection className="text-center mb-8">
        <h2 className="font-script text-4xl md:text-5xl mb-4" style={{ color: '#5C2018' }}>
          {t('reveal.title')}
        </h2>
        <p className="font-body text-sm tracking-[0.15em] uppercase" style={{ color: '#5C2018' }}>
          {allRevealed ? '' : t('reveal.subtitle')}
        </p>
      </AnimatedSection>

      {/* Hint text */}
      {!allRevealed && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1 }}
          className="font-body text-xs tracking-wide mb-6 text-center"
          style={{ color: '#5C2018' }}
        >
          {t('reveal.scratchHint')}
        </motion.p>
      )}

      {/* Three scratch cards */}
      <div className="flex gap-6 md:gap-10">
        {DATE_PARTS.map((part, i) => (
          <ScratchCard
            key={part}
            revealed={part}
            onReveal={handleReveal}
            index={i}
          />
        ))}
      </div>

      {/* Announcement after all revealed */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={allRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="font-script text-2xl md:text-3xl mt-8"
        style={{ color: '#5C2018' }}
      >
        {t('reveal.weddingAnnouncement')}
      </motion.p>
    </section>
  )
}
