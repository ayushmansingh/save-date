import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

export function ThankYouCard() {
  const { t } = useLanguage()

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="py-16 px-8 flex flex-col items-center justify-center text-center"
      style={{ backgroundColor: 'rgb(250, 248, 245)' }}
    >
      {/* Postage-stamp style card */}
      <div
        className="relative max-w-sm w-full px-8 py-10 rounded-sm shadow-md"
        style={{
          backgroundColor: 'white',
          border: '12px solid white',
          outline: '2px solid rgba(92,32,24,0.15)',
        }}
      >
        {/* Perforated edge effect */}
        <div
          className="absolute inset-0 rounded-sm pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(92,32,24,0.08) 1px, transparent 1px)',
            backgroundSize: '12px 12px',
            backgroundPosition: '-6px -6px',
          }}
        />

        <p className="font-body text-xs tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(92,32,24,0.5)' }}>
          Sam & Sofía
        </p>
        <h2 className="font-script text-5xl md:text-6xl mb-4" style={{ color: '#5C2018' }}>
          {t('thankYou.title')}
        </h2>
        <p className="font-body text-sm leading-relaxed" style={{ color: '#5C2018' }}>
          {t('thankYou.message')}
        </p>

        {/* Stamp decoration */}
        <div
          className="absolute top-4 right-4 w-12 h-14 flex items-center justify-center text-lg"
          style={{
            border: '2px solid rgba(92,32,24,0.3)',
            borderRadius: 2,
          }}
        >
          💍
        </div>
      </div>
    </motion.section>
  )
}
