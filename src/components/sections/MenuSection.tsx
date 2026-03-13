import { useLanguage } from '../../context/LanguageContext'
import { AnimatedSection } from '../ui/AnimatedSection'

// TODO: Replace with: import menuFrame from '../../assets/images/menu-frame.png'
const MENU_FRAME = '' // placeholder

interface MenuRowProps {
  title: string
  desc: string
  sub: string
  delay: number
}

function MenuRow({ title, desc, sub, delay }: MenuRowProps) {
  return (
    <AnimatedSection delay={delay} className="text-center mb-5">
      <h3 className="font-display text-xs md:text-sm tracking-[0.2em] uppercase mb-1" style={{ color: '#5C2018' }}>
        {title}
      </h3>
      <p className="font-body text-[10px] md:text-xs" style={{ color: '#5C2018' }}>{desc}</p>
      <p className="font-body text-[10px] md:text-xs italic" style={{ color: '#5C2018' }}>{sub}</p>
    </AnimatedSection>
  )
}

export function MenuSection() {
  const { t } = useLanguage()

  return (
    <section className="flex flex-col items-center justify-center py-8 px-4" style={{ backgroundColor: 'rgb(250, 248, 245)' }}>
      <div className="relative w-full max-w-md md:max-w-lg">
        {MENU_FRAME ? (
          <img src={MENU_FRAME} alt="" className="w-full h-auto" />
        ) : (
          // Fallback card when no frame image
          <div className="w-full rounded-2xl py-10 px-8" style={{ backgroundColor: 'white', border: '2px solid rgba(92,32,24,0.15)' }} />
        )}

        <div className="absolute inset-0 flex flex-col items-center justify-center px-[12%] -mt-8">
          <MenuRow
            title={t('menu.aperitivo')}
            desc={t('menu.aperitivoDesc')}
            sub={t('menu.aperitivoSub')}
            delay={0.1}
          />
          <MenuRow
            title={t('menu.primo')}
            desc={t('menu.primoDesc')}
            sub={t('menu.primoSub')}
            delay={0.2}
          />
          <MenuRow
            title={t('menu.secondo')}
            desc={t('menu.secondoDesc')}
            sub={t('menu.secondoSub')}
            delay={0.3}
          />
          <MenuRow
            title={t('menu.dolce')}
            desc={t('menu.dolceDesc')}
            sub={t('menu.dolceSub')}
            delay={0.4}
          />
          <AnimatedSection delay={0.5} className="text-center">
            <p className="font-script text-lg md:text-xl" style={{ color: '#5C2018' }}>
              {t('menu.wines')}
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
