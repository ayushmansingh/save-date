import { useLanguage } from '../../context/LanguageContext'
import { AnimatedSection } from '../ui/AnimatedSection'

// TODO: Replace with: import venueIllustration from '../../assets/images/venue-illustration.png'
const VENUE_IMG = '' // placeholder

export function VenueSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-white flex flex-col items-center justify-start pt-8 pb-12 px-8">
      <AnimatedSection className="text-center mb-4">
        <p className="font-body text-sm tracking-[0.15em] uppercase" style={{ color: '#5C2018' }}>
          {t('saveTheDate.celebrationAt')}
        </p>
      </AnimatedSection>

      {/* Venue illustration */}
      <AnimatedSection delay={0.1} className="relative max-w-2xl w-full mb-8">
        <div className="absolute -top-2 -right-2 md:top-0 md:right-0 z-10">
          <div
            className="px-3 py-1.5 rounded-full shadow-md text-center"
            style={{ backgroundColor: '#5C2018', maxWidth: 140 }}
          >
            <span className="font-body text-[9px] md:text-[10px] tracking-wide text-white leading-tight block">
              {t('saveTheDate.extraBadge')}
            </span>
          </div>
        </div>
        {VENUE_IMG ? (
          <img src={VENUE_IMG} alt="Venue Illustration" className="w-full h-auto" />
        ) : (
          <div className="w-full h-64 md:h-80 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(92,32,24,0.06)', border: '2px dashed rgba(92,32,24,0.2)' }}>
            <span className="font-body text-sm" style={{ color: 'rgba(92,32,24,0.4)' }}>venue-illustration.png</span>
          </div>
        )}
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="text-center mb-4">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-wide leading-tight" style={{ color: '#5C2018' }}>
          Villa Medicea di Artimino
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.3} className="text-center mb-8">
        <p className="font-body text-xs tracking-[0.2em] uppercase" style={{ color: '#5C2018' }}>
          Via di Papa Leone X, 28
        </p>
        <p className="font-body text-xs tracking-[0.2em] uppercase" style={{ color: '#5C2018' }}>
          Artimino, Florencia
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.4} className="text-center mb-10">
        <p className="font-display text-2xl md:text-3xl tracking-wide" style={{ color: '#5C2018' }}>
          September 10, 2027
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.5} className="text-center">
        <p className="font-script text-3xl md:text-4xl" style={{ color: '#5C2018' }}>
          {t('saveTheDate.receptionToFollow')}
        </p>
      </AnimatedSection>
    </section>
  )
}
