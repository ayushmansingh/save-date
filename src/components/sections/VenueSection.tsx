import { AnimatedSection } from '../ui/AnimatedSection'
import venueIllustration from '../../assets/venue-illustration.png'

export function VenueSection() {
  return (
    <section className="bg-white flex flex-col items-center justify-start pt-8 pb-12 px-8">
      <AnimatedSection className="text-center mb-4">
        <p className="font-body text-sm tracking-[0.15em] uppercase" style={{ color: '#5C2018' }}>
          The celebration will take place at
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="relative max-w-2xl w-full mb-8">
        <img src={venueIllustration} alt="Venue Illustration" className="w-full h-auto" />
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="text-center mb-4">
        {/* TODO: Update venue name */}
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-wide leading-tight" style={{ color: '#5C2018' }}>
          Venue Name
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.3} className="text-center mb-8">
        {/* TODO: Update venue address */}
        <p className="font-body text-xs tracking-[0.2em] uppercase" style={{ color: '#5C2018' }}>Address Line 1</p>
        <p className="font-body text-xs tracking-[0.2em] uppercase" style={{ color: '#5C2018' }}>City</p>
      </AnimatedSection>

      <AnimatedSection delay={0.4} className="text-center mb-10">
        <p className="font-display text-2xl md:text-3xl tracking-wide" style={{ color: '#5C2018' }}>
          November 20, 2026
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.5} className="text-center">
        <p className="font-script text-3xl md:text-4xl" style={{ color: '#5C2018' }}>
          Reception to Follow
        </p>
      </AnimatedSection>
    </section>
  )
}
