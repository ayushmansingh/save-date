import { motion } from 'framer-motion'
import { useScratch } from '../../hooks/useScratch'

interface ScratchCardProps {
  revealed: string   // text shown beneath ("10", "Sept", "2027")
  onReveal: () => void
  index: number      // 0|1|2 — used for stagger delay
}

export function ScratchCard({ revealed, onReveal, index }: ScratchCardProps) {
  const {
    isRevealed,
    canvasRef,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  } = useScratch(onReveal)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center"
    >
      <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden">
        {/* Value shown beneath */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-white"
        >
          <span className="font-display text-2xl md:text-3xl" style={{ color: '#5C2018' }}>
            {revealed}
          </span>
        </div>

        {/* Scratch canvas on top */}
        <canvas
          ref={canvasRef}
          width={150}
          height={150}
          className="absolute inset-0 w-full h-full cursor-pointer touch-none"
          style={{
            opacity: isRevealed ? 0 : 1,
            transition: 'opacity 0.7s',
            pointerEvents: isRevealed ? 'none' : 'auto',
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        />
      </div>
    </motion.div>
  )
}
