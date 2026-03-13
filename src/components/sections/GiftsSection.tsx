import { AnimatedSection } from '../ui/AnimatedSection'

// TODO: Replace with: import giftIcon from '../../assets/images/gift-icon.png'
const GIFT_ICON = ''

export function GiftsSection() {
  return (
    <section className="flex flex-col items-center justify-center py-12 px-8" style={{ backgroundColor: 'rgb(250, 248, 245)' }}>
      <AnimatedSection className="text-center mb-12">
        <p className="font-body text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#5C2018' }}>Wedding registry</p>
        {GIFT_ICON ? (
          <img src={GIFT_ICON} alt="Gift" className="w-28 h-28 mx-auto mb-4 object-contain" />
        ) : (
          <div className="w-28 h-28 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(92,32,24,0.08)' }}>
            <span className="text-4xl">🎁</span>
          </div>
        )}
        <h2 className="font-display text-5xl md:text-6xl tracking-wide" style={{ color: '#5C2018' }}>Gifts</h2>
      </AnimatedSection>
      <AnimatedSection delay={0.2} className="text-center max-w-xl mb-12">
        <p className="font-body text-base leading-relaxed" style={{ color: '#5C2018' }}>
          Your presence is the best gift we could receive. However, if you wish to contribute to our new life together, you can do so via bank transfer.
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.3} className="text-center mb-12">
        <p className="font-script text-3xl md:text-4xl" style={{ color: '#5C2018' }}>With all our love</p>
      </AnimatedSection>
      <AnimatedSection delay={0.4} className="text-center">
        <p className="font-body text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#5C2018' }}>Bank details</p>
        {/* TODO: Update with actual bank details */}
        <div className="border-2 px-8 py-6 inline-block" style={{ borderColor: '#5C2018' }}>
          <p className="font-body text-sm tracking-wide mb-2" style={{ color: '#5C2018' }}>ACCOUNT HOLDER: DHWANI & AYUSHMAN</p>
          <p className="font-body text-sm tracking-wide mb-2" style={{ color: '#5C2018' }}>IBAN: — — — — —</p>
          <p className="font-body text-sm tracking-wide" style={{ color: '#5C2018' }}>REFERENCE: Dhwani & Ayushman Wedding</p>
        </div>
      </AnimatedSection>
    </section>
  )
}
