import { useLanguage } from '../../context/LanguageContext'
import { AnimatedSection } from '../ui/AnimatedSection'

export function TransportSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-white flex flex-col items-center justify-center py-12 px-8">
      <AnimatedSection className="text-center mb-12">
        <p className="font-body text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#5C2018' }}>
          {t('transport.howToGet')}
        </p>
        <h2 className="font-display text-5xl md:text-6xl tracking-wide" style={{ color: '#5C2018' }}>
          {t('transport.title')}
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="text-center max-w-xl mb-16">
        <p className="font-body text-base leading-relaxed" style={{ color: '#5C2018' }}>
          {t('transport.description')}
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.3} className="text-center mb-16">
        <p className="font-body text-xs tracking-[0.2em] uppercase mb-6" style={{ color: '#5C2018' }}>
          {t('transport.departure')}
        </p>
        <p className="font-display text-2xl md:text-3xl tracking-wide mb-2" style={{ color: '#5C2018' }}>
          Piazza della Signoria
        </p>
        <p className="font-display text-xl md:text-2xl tracking-wide" style={{ color: '#5C2018' }}>
          16:00h
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.4} className="text-center mb-12">
        <p className="font-body text-xs tracking-[0.2em] uppercase mb-6" style={{ color: '#5C2018' }}>
          {t('transport.returnTo')}
        </p>
        <p className="font-display text-xl md:text-2xl tracking-wide" style={{ color: '#5C2018' }}>
          02:00h
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.5} className="text-center">
        <p className="font-script text-2xl md:text-3xl" style={{ color: '#5C2018' }}>
          {t('transport.rsvpNote')}
        </p>
      </AnimatedSection>
    </section>
  )
}
