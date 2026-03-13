import { AnimatedSection } from './AnimatedSection'

interface CountdownUnitProps {
  value: number
  label: string
  delay?: number
}

export function CountdownUnit({ value, label, delay = 0 }: CountdownUnitProps) {
  return (
    <AnimatedSection delay={delay} className="flex flex-col items-center">
      <div
        className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border rounded-lg mb-2"
        style={{ borderColor: '#5C2018' }}
      >
        <span
          className="font-display text-2xl md:text-3xl"
          style={{ color: '#5C2018' }}
        >
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span
        className="font-body text-[10px] md:text-xs tracking-[0.15em] uppercase"
        style={{ color: '#5C2018' }}
      >
        {label}
      </span>
    </AnimatedSection>
  )
}
