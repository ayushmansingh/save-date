import { useLanguage } from '../../context/LanguageContext'
import { AnimatedSection } from '../ui/AnimatedSection'

// TODO: Replace with: import dresscodeIllustration from '../../assets/images/dresscode-illustration.png'
const DRESSCODE_IMG = '' // placeholder

export function DressCodeSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-white flex flex-col items-center justify-center py-12 px-8">
      <AnimatedSection className="text-center mb-8">
        <h2 className="font-display text-5xl md:text-6xl tracking-wide" style={{ color: '#5C2018' }}>
          {t('dressCode.title')}
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="w-full max-w-xs mb-8">
        {DRESSCODE_IMG ? (
          <img src={DRESSCODE_IMG} alt="Dress Code Illustration" className="w-full h-auto" />
        ) : (
          <div className="w-full h-48 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(92,32,24,0.06)', border: '2px dashed rgba(92,32,24,0.2)' }}>
            <span className="font-body text-sm" style={{ color: 'rgba(92,32,24,0.4)' }}>dresscode-illustration.png</span>
          </div>
        )}
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="text-center max-w-xl mb-8">
        <p className="font-body text-base leading-relaxed" style={{ color: '#5C2018' }}>
          {t('dressCode.description')}
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.3} className="text-center mb-8">
        <p className="font-display text-3xl md:text-4xl tracking-wide" style={{ color: '#5C2018' }}>
          {t('dressCode.formal')}
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.4} className="text-center">
        <p className="font-script text-2xl md:text-3xl" style={{ color: '#5C2018' }}>
          {t('dressCode.avoidWhite')}
        </p>
      </AnimatedSection>
    </section>
  )
}
