import { useCountdown } from '../../hooks/useCountdown'
import { AnimatedSection } from '../ui/AnimatedSection'
import { CountdownUnit } from '../ui/CountdownUnit'

export function CountdownSection() {
  const { days, hours, minutes, seconds } = useCountdown()

  return (
    <section className="py-12 bg-white flex flex-col items-center justify-center px-8">
      <AnimatedSection className="text-center mb-10">
        <h2 className="font-script text-4xl md:text-5xl mb-2" style={{ color: '#5C2018' }}>
          Countdown
        </h2>
      </AnimatedSection>
      <div className="flex gap-4 md:gap-8">
        <CountdownUnit value={days}    label="Days"  delay={0.1} />
        <CountdownUnit value={hours}   label="Hours" delay={0.2} />
        <CountdownUnit value={minutes} label="Min"   delay={0.3} />
        <CountdownUnit value={seconds} label="Sec"   delay={0.4} />
      </div>
      <AnimatedSection delay={0.5}>
        <p className="font-body text-sm tracking-wide mt-10" style={{ color: '#5C2018' }}>
          until the big day
        </p>
      </AnimatedSection>
    </section>
  )
}
