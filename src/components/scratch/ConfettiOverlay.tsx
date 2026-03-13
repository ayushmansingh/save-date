import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ConfettiParticle } from '../../types'

function generateParticles(count = 60): ConfettiParticle[] {
  const shapes: ConfettiParticle['shape'][] = ['circle', 'square', 'rectangle']
  return Array.from({ length: count }, (_, i) => ({
    id: String(i),
    x: Math.random() * 100,
    delay: Math.random() * 1.5,
    duration: 3 + Math.random() * 2,
    size: 5 + Math.random() * 8,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
  }))
}

interface ConfettiOverlayProps {
  active: boolean
}

export function ConfettiOverlay({ active }: ConfettiOverlayProps) {
  const [particles] = useState<ConfettiParticle[]>(generateParticles)

  // Auto-dismiss after 5s
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!active) { setVisible(false); return }
    setVisible(true)
    const id = setTimeout(() => setVisible(false), 5000)
    return () => clearTimeout(id)
  }, [active])

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: -20, opacity: 0, rotate: 0 }}
              animate={{
                y: window.innerHeight + 100,
                opacity: [0, 1, 1, 1, 0],
                rotate: 720,
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: 'linear',
              }}
              className="absolute"
              style={{
                left: `${p.x}%`,
                top: -20,
                width: p.shape === 'rectangle' ? p.size * 2.5 : p.size,
                height: p.size,
                backgroundColor: '#5C2018',
                borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'square' ? 2 : 2,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}
