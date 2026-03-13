import { AnimatedSection } from '../ui/AnimatedSection'

export function TransportSection() {
  return (
    <section className="bg-white flex flex-col items-center justify-center py-12 px-8">
      <AnimatedSection className="text-center mb-12">
        <p className="font-body text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#5C2018' }}>How to get there</p>
        <h2 className="font-display text-5xl md:text-6xl tracking-wide" style={{ color: '#5C2018' }}>Transport</h2>
      </AnimatedSection>
      <AnimatedSection delay={0.2} className="text-center max-w-xl mb-16">
        {/* TODO: Update transport details */}
        <p className="font-body text-base leading-relaxed" style={{ color: '#5C2018' }}>
          We have organized transport for guests so you can enjoy the celebration without worries.
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.3} className="text-center mb-16">
        <p className="font-body text-xs tracking-[0.2em] uppercase mb-6" style={{ color: '#5C2018' }}>Departure</p>
        {/* TODO: Update pickup location */}
        <p className="font-display text-2xl md:text-3xl tracking-wide mb-2" style={{ color: '#5C2018' }}>Pickup Location</p>
        <p className="font-display text-xl md:text-2xl tracking-wide" style={{ color: '#5C2018' }}>— : — h</p>
      </AnimatedSection>
      <AnimatedSection delay={0.4} className="text-center mb-12">
        <p className="font-body text-xs tracking-[0.2em] uppercase mb-6" style={{ color: '#5C2018' }}>Return</p>
        <p className="font-display text-xl md:text-2xl tracking-wide" style={{ color: '#5C2018' }}>— : — h</p>
      </AnimatedSection>
      <AnimatedSection delay={0.5} className="text-center">
        <p className="font-script text-2xl md:text-3xl" style={{ color: '#5C2018' }}>
          Please indicate in your RSVP if you need transport
        </p>
      </AnimatedSection>
    </section>
  )
}
