import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── ASSETS ─────────────────────────────────────────────────────────────────
// TODO: Uncomment once files are ready:
//   import curtainVideo from '../../assets/video/curtain-video.mp4'
//   import ambientLoopVideo from '../../assets/video/ambient-loop.mp4'
const CURTAIN_VIDEO = ''   // plays once: curtains opening
const AMBIENT_LOOP  = ''   // loops behind names after curtain ends

// ── State machine ──────────────────────────────────────────────────────────
// idle  → (tap) → curtain (curtain video plays once)
//               → loop    (ambient video loops, names/scroll visible)
type CurtainState = 'idle' | 'curtain' | 'loop'

interface IntroCurtainSectionProps {
  onComplete: () => void    // page is fully unlocked
  onFirstClick: () => void  // starts audio
}

export function IntroCurtainSection({ onComplete, onFirstClick }: IntroCurtainSectionProps) {
  const [state, setState] = useState<CurtainState>('idle')
  const [curtainFading, setCurtainFading] = useState(false)
  const curtainVideoRef = useRef<HTMLVideoElement>(null)
  const loopVideoRef = useRef<HTMLVideoElement>(null)
  const hasClickedRef = useRef(false)

  const handleClick = useCallback(() => {
    if (state !== 'idle') return

    if (!hasClickedRef.current) {
      hasClickedRef.current = true
      onFirstClick()
    }

    if (CURTAIN_VIDEO && curtainVideoRef.current) {
      setState('curtain')
      curtainVideoRef.current.play().catch(() => {})
    } else {
      // No curtain video: fade straight to loop/done state
      setCurtainFading(true)
      setTimeout(() => {
        setState('loop')
        onComplete()
        if (AMBIENT_LOOP && loopVideoRef.current) {
          loopVideoRef.current.play().catch(() => {})
        }
      }, 600)
    }
  }, [state, onFirstClick, onComplete])

  // Fade curtain video near end, then transition to loop
  function handleCurtainTimeUpdate() {
    if (!curtainVideoRef.current) return
    const { currentTime, duration } = curtainVideoRef.current
    if (duration && currentTime >= duration - 0.8 && !curtainFading) {
      setCurtainFading(true)
    }
  }

  function handleCurtainEnded() {
    setState('loop')
    setCurtainFading(false)
    onComplete()
    if (AMBIENT_LOOP && loopVideoRef.current) {
      loopVideoRef.current.play().catch(() => {})
    }
  }

  return (
    <section
      className="relative h-screen w-full cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      {/* ── Background / ambient loop video ── */}
      {AMBIENT_LOOP ? (
        <video
          ref={loopVideoRef}
          src={AMBIENT_LOOP}
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: state === 'loop' ? 1 : 0, transition: 'opacity 0.8s ease' }}
        />
      ) : (
        // Placeholder gradient shown in idle + loop states
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #8B3A2A 0%, #5C2018 50%, #3D1510 100%)',
            opacity: state === 'curtain' ? 0 : 1,
            transition: 'opacity 0.6s ease',
          }}
        />
      )}

      {/* ── Curtain video (one-shot, on top) ── */}
      {CURTAIN_VIDEO && (
        <video
          ref={curtainVideoRef}
          src={CURTAIN_VIDEO}
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            display: state === 'idle' ? 'none' : 'block',
            opacity: curtainFading ? 0 : 1,
            transition: 'opacity 0.8s ease',
            zIndex: 10,
          }}
          onTimeUpdate={handleCurtainTimeUpdate}
          onEnded={handleCurtainEnded}
        />
      )}

      {/* ── Names + invitation text (idle + loop) ── */}
      <AnimatePresence>
        {state !== 'curtain' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <div className="flex flex-col items-center text-center max-w-[55%] md:max-w-[45%] px-4">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display text-[8px] md:text-[10px] tracking-[0.15em] uppercase mb-4"
                style={{ color: 'rgba(255,255,255,0.9)' }}
              >
                You are cordially invited to celebrate the wedding of
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="font-script text-6xl md:text-7xl lg:text-8xl leading-none"
                style={{ color: 'white' }}
              >
                Dhwani
              </motion.h1>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="font-script text-3xl md:text-4xl"
                style={{ color: 'white' }}
              >
                &amp;
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="font-script text-6xl md:text-7xl lg:text-8xl mb-6 leading-none"
                style={{ color: 'white' }}
              >
                Ayushman
              </motion.h1>

              {/* Tap to continue pulse — only in idle */}
              {state === 'idle' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="font-body text-xs tracking-[0.3em] uppercase mt-2"
                  style={{ color: 'rgba(255,255,255,0.8)' }}
                >
                  Tap to continue
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Personal message (bottom) ── */}
      <AnimatePresence>
        {state !== 'curtain' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-40 left-0 right-0 flex justify-center px-4 z-20"
          >
            <p
              className="font-display text-[11px] md:text-sm tracking-[0.12em] uppercase leading-relaxed text-center max-w-[85%] md:max-w-[65%]"
              style={{ color: 'rgba(255,255,255,0.85)' }}
            >
              We would like to invite you to celebrate with us the most special day of our lives.
              It would be an honour to have you present at this important moment.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scroll indicator (loop state only) ── */}
      <AnimatePresence>
        {state === 'loop' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute bottom-8 left-0 right-0 flex justify-center z-20"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center"
            >
              <p className="font-display text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Scroll
              </p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
