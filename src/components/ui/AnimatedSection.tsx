import { motion } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  style?: CSSProperties
}

export function AnimatedSection({
  children,
  delay = 0,
  y = 20,
  className,
  style,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      viewport={{ once: true }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
