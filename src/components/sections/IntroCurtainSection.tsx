import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

// TODO: Replace with actual imports once files are available:
//   import curtainOpenImg from '../../assets/images/curtain-open.jpg'
//   const CURTAIN_OPEN = curtainOpenImg
//   const CURTAIN_VIDEO = '/assets/video/curtain-video.mp4'
const CURTAIN_OPEN = ''   // placeholder
const CURTAIN_VIDEO = ''  // placeholder

type CurtainState = 'idle' | 'playing' | 'done'

interface IntroCurtainSectionProps {
  onComplete: () => void   // called when curtain animation ends → page unlocks
  onFirstClick: () => void // called on first tap → starts audio
}

export function IntroCurtainSection({ onComplete, onFirstClick }: IntroCurtainSectionProps) {
  const { t } = useLanguage()
  const [state, setState] = useState<CurtainState>('idle')
  const [videoFading, setVideoFading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasClickedRef = useRef(false)

  const handleClick = useCallback(() => {
    if (state !== 'idle') return

    if (!hasClickedRef.current) {
      hasClickedRef.current = true
      onFirstClick()
    }

    if (CURTAIN_VIDEO && videoRef.current) {
      setState('playing')
      videoRef.current.play().catch(() => {})
    } else {
      // No video: skip straight to done with a fade
      setState('playing')
      setTimeout(() => {
        setState('done')
        onComplete()
      }, 800)
    }
  }, [state, onFirstClick, onComplete])

  function handleTimeUpdate() {
    if (!videoRef.current) return
    const { currentTime, duration } = videoRef.current
    if (duration && currentTime >= duration - 0.8 && !videoFading) {
      setVideoFading(true)
    }
  }

  function handleEnded() {
    setState('done')
    onComplete()
  }

  return (
    <section
      className="relative h-screen w-full cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      {/* Static curtain image (background) */}
      {CURTAIN_OPEN ? (
        <img
          src={CURTAIN_OPEN}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        // Placeholder gradient
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #8B3A2A 0%, #5C2018 50%, #3D1510 100%)',
          }}
        />
      )}

      {/* Curtain video overlay */}
      {CURTAIN_VIDEO && (
        <video
          ref={videoRef}
          src={CURTAIN_VIDEO}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            display: state === 'idle' ? 'none' : 'block',
            opacity: videoFading ? 0 : 1,
            transition: 'opacity 0.8s ease',
          }}
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />
      )}

      {/* Hero text */}
      <AnimatePresence>
        {state !== 'playing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex flex-col items-center text-center max-w-[55%] md:max-w-[45%] lg:max-w-[40%] px-4 pt-4">
              <p
                className="font-display text-[8px] md:text-[10px] tracking-[0.15em] uppercase mb-4"
                style={{ color: 'rgba(255,255,255,0.9)' }}
              >
                {t('intro.invitation')}
              </p>
              <h1 className="font-script text-6xl md:text-7xl lg:text-8xl mb-0 leading-none" style={{ color: 'white' }}>
                Sam
              </h1>
              <span className="font-script text-3xl md:text-4xl" style={{ color: 'white' }}>
                &amp;
              </span>
              <h1 className="font-script text-6xl md:text-7xl lg:text-8xl mb-6 leading-none" style={{ color: 'white' }}>
                Sofía
              </h1>

              {state === 'idle' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="font-body text-xs tracking-[0.3em] uppercase mt-4"
                  style={{ color: 'rgba(255,255,255,0.8)' }}
                >
                  {t('intro.tapToContinue')}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Personal message */}
      <AnimatePresence>
        {state !== 'playing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute bottom-40 left-0 right-0 flex justify-center px-4"
          >
            <p
              className="font-display text-[11px] md:text-sm tracking-[0.12em] uppercase leading-relaxed text-center max-w-[85%] md:max-w-[70%] lg:max-w-[60%]"
              style={{ color: 'rgba(255,255,255,0.85)' }}
            >
              {t('intro.personalMessage')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      <AnimatePresence>
        {state === 'done' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-8 left-0 right-0 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center"
            >
              <p className="font-display text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: '#5C2018' }}>
                {t('intro.scroll')}
              </p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5C2018" strokeWidth="1.5">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
