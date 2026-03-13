import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, X } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

// TODO: Replace with: import logo from '../../assets/images/thedigitalyes-logo.png'
const LOGO_SRC = '' // placeholder

export function BrandBadge() {
  const { t } = useLanguage()
  const [showInfo, setShowInfo] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="fixed top-4 left-4 z-[9999] flex items-center gap-2"
      >
        {/* Logo + title pill */}
        <a
          href="https://www.thedigitalyes.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          style={{
            backgroundColor: 'rgba(250, 248, 245, 0.6)',
            border: '1px solid rgba(92, 32, 24, 0.2)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {LOGO_SRC ? (
            <img src={LOGO_SRC} alt="The Digital Yes" className="w-6 h-6 object-contain" />
          ) : (
            <div className="w-6 h-6 rounded-full bg-burgundy opacity-40" />
          )}
          <div className="flex flex-col">
            <span className="font-body text-[10px] tracking-wide uppercase leading-tight" style={{ color: '#5C2018' }}>
              {t('demo.title')}
            </span>
            <span className="font-body text-[9px] tracking-wide leading-tight" style={{ color: 'rgba(92,32,24,0.7)' }}>
              {t('demo.buyNow')}
            </span>
          </div>
        </a>

        {/* Info button */}
        <button
          onClick={() => setShowInfo(true)}
          className="w-7 h-7 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          style={{
            backgroundColor: 'rgba(250, 248, 245, 0.6)',
            border: '1px solid rgba(92, 32, 24, 0.2)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Info size={14} style={{ color: '#5C2018' }} />
        </button>
      </motion.div>

      {/* Info modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl p-6 max-w-sm w-full shadow-xl"
              style={{ backgroundColor: 'rgb(250, 248, 245)', border: '1px solid rgba(92,32,24,0.15)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg tracking-wide" style={{ color: '#5C2018' }}>
                  {t('demo.infoTitle')}
                </h3>
                <button onClick={() => setShowInfo(false)}>
                  <X size={18} style={{ color: '#5C2018' }} />
                </button>
              </div>
              <ul className="space-y-3">
                {(['infoIllustration', 'infoColors', 'infoContent', 'infoSections'] as const).map((k) => (
                  <li key={k} className="flex items-start gap-2">
                    <span style={{ color: '#5C2018' }}>•</span>
                    <span className="font-body text-sm" style={{ color: '#5C2018' }}>
                      {t(`demo.${k}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
