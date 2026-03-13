import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import endStateImg from '../../assets/EndState.JPG'
import curtainVideoSrc from '../../assets/Video.MP4'

// ── State machine ────────────────────────────────────────────────────────────
// idle    → EndState.JPG bg + "Click to play"
// curtain → Video.MP4 plays once (curtains opening)
// open    → EndState.JPG bg + invitation text + scroll indicator
type CurtainState = 'idle' | 'curtain' | 'open'

interface IntroCurtainSectionProps {
  onComplete: () => void   // page is fully unlocked
  onFirstClick: () => void // starts audio
}

export function IntroCurtainSection({ onComplete, onFirstClick }: IntroCurtainSectionProps) {
  const [state, setState] = useState<CurtainState>('idle')
  const [nearEnd, setNearEnd] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasClickedRef = useRef(false)

  const handleClick = useCallback(() => {
    if (state !== 'idle') return
    if (!hasClickedRef.current) {
      hasClickedRef.current = true
      onFirstClick()
    }
    setState('curtain')
    videoRef.current?.play().catch(() => {})
  }, [state, onFirstClick])

  function handleTimeUpdate() {
    if (!videoRef.current) return
    const { currentTime, duration } = videoRef.current
    if (duration && currentTime >= duration - 0.8 && !nearEnd) {
      setNearEnd(true)
    }
  }

  function handleEnded() {
    setState('open')
    setNearEnd(false)
    onComplete()
  }

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      style={{ cursor: state === 'idle' ? 'pointer' : 'default' }}
      onClick={handleClick}
    >
      {/* ── EndState image — always present as base layer ── */}
      <img
        src={endStateImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: state === 'curtain' ? 0 : 1,
          transition: 'opacity 0.6s ease',
          zIndex: 1,
        }}
      />

      {/* ── Curtain video — plays once on tap ── */}
      <video
        ref={videoRef}
        src={curtainVideoSrc}
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          display: state === 'idle' ? 'none' : 'block',
          opacity: nearEnd ? 0 : 1,
          transition: 'opacity 0.8s ease',
          zIndex: 10,
        }}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {/* ── idle: Click to play ── */}
      <AnimatePresence>
        {state === 'idle' && (
          <motion.div
            key="cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            {/* Play button ring */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center justify-center w-16 h-16 rounded-full border-2 mb-4"
              style={{ borderColor: 'rgba(92,32,24,0.4)', backgroundColor: 'rgba(92,32,24,0.06)' }}
            >
              {/* Triangle play icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#5C2018" opacity={0.7}>
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            </motion.div>

            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="font-body text-xs tracking-[0.3em] uppercase"
              style={{ color: 'rgba(92,32,24,0.6)' }}
            >
              Click to play
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── open: Invitation text ── */}
      <AnimatePresence>
        {state === 'open' && (
          <motion.div
            key="invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <div className="flex flex-col items-center text-center max-w-[55%] md:max-w-[45%] px-4">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-display text-[8px] md:text-[10px] tracking-[0.15em] uppercase mb-4"
                style={{ color: 'rgba(92,32,24,0.7)' }}
              >
                You are cordially invited to celebrate the wedding of
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="font-script text-6xl md:text-7xl lg:text-8xl leading-none"
                style={{ color: '#5C2018' }}
              >
                Dhwani
              </motion.h1>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="font-script text-3xl md:text-4xl"
                style={{ color: '#5C2018' }}
              >
                &amp;
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="font-script text-6xl md:text-7xl lg:text-8xl leading-none"
                style={{ color: '#5C2018' }}
              >
                Ayushman
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="font-display text-[9px] md:text-[11px] tracking-[0.2em] uppercase mt-5"
                style={{ color: 'rgba(92,32,24,0.6)' }}
              >
                20 · November · 2026
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── open: Personal message (bottom) ── */}
      <AnimatePresence>
        {state === 'open' && (
          <motion.div
            key="message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-28 left-0 right-0 flex justify-center px-4 z-20"
          >
            <p
              className="font-display text-[11px] md:text-sm tracking-[0.12em] uppercase leading-relaxed text-center max-w-[85%] md:max-w-[60%]"
              style={{ color: 'rgba(92,32,24,0.75)' }}
            >
              We would like to invite you to celebrate with us the most special day of our lives.
              It would be an honour to have you present at this important moment.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── open: Scroll indicator ── */}
      <AnimatePresence>
        {state === 'open' && (
          <motion.div
            key="scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute bottom-8 left-0 right-0 flex justify-center z-20"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center"
            >
              <p className="font-display text-[10px] tracking-[0.2em] uppercase mb-2"
                style={{ color: 'rgba(92,32,24,0.5)' }}>
                Scroll
              </p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="rgba(92,32,24,0.5)" strokeWidth="1.5">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
