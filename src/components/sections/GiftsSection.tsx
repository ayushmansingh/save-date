import { useLanguage } from '../../context/LanguageContext'
import { AnimatedSection } from '../ui/AnimatedSection'

// TODO: Replace with: import giftIcon from '../../assets/images/gift-icon.png'
const GIFT_ICON = '' // placeholder

export function GiftsSection() {
  const { t } = useLanguage()

  return (
    <section
      className="flex flex-col items-center justify-center py-12 px-8"
      style={{ backgroundColor: 'rgb(250, 248, 245)' }}
    >
      <AnimatedSection className="text-center mb-12">
        <p className="font-body text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#5C2018' }}>
          {t('gifts.weddingList')}
        </p>
        {GIFT_ICON ? (
          <img src={GIFT_ICON} alt="Gift" className="w-28 h-28 mx-auto mb-4 object-contain" />
        ) : (
          <div className="w-28 h-28 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(92,32,24,0.08)' }}>
            <span className="text-4xl">🎁</span>
          </div>
        )}
        <h2 className="font-display text-5xl md:text-6xl tracking-wide" style={{ color: '#5C2018' }}>
          {t('gifts.title')}
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="text-center max-w-xl mb-12">
        <p className="font-body text-base leading-relaxed mb-6" style={{ color: '#5C2018' }}>
          {t('gifts.message')}
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.3} className="text-center mb-12">
        <p className="font-script text-3xl md:text-4xl" style={{ color: '#5C2018' }}>
          {t('gifts.withLove')}
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.4} className="text-center">
        <p className="font-body text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#5C2018' }}>
          {t('gifts.bankDetails')}
        </p>
        <div className="border-2 px-8 py-6 inline-block" style={{ borderColor: '#5C2018' }}>
          <p className="font-body text-sm tracking-wide mb-2" style={{ color: '#5C2018' }}>
            {t('gifts.accountHolder')}
          </p>
          <p className="font-body text-sm tracking-wide mb-2" style={{ color: '#5C2018' }}>
            {t('gifts.iban')}
          </p>
          <p className="font-body text-sm tracking-wide" style={{ color: '#5C2018' }}>
            {t('gifts.concept')}
          </p>
        </div>
      </AnimatedSection>
    </section>
  )
}
