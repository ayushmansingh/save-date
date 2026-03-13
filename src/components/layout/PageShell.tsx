import { useState } from 'react'
import { BrandBadge } from '../fixed/BrandBadge'
import { LanguageSwitcher } from '../fixed/LanguageSwitcher'
import { AudioPlayer } from '../fixed/AudioPlayer'
import { IntroCurtainSection } from '../sections/IntroCurtainSection'
import { ScratchRevealSection } from '../sections/ScratchRevealSection'
import { CountdownSection } from '../sections/CountdownSection'
import { VenueSection } from '../sections/VenueSection'
import { MenuSection } from '../sections/MenuSection'
import { DressCodeSection } from '../sections/DressCodeSection'
import { GiftsSection } from '../sections/GiftsSection'
import { TransportSection } from '../sections/TransportSection'
import { RSVPSection } from '../sections/RSVPSection'
import { ThankYouCard } from '../sections/ThankYouCard'

export function PageShell() {
  // Lifted state: audio starts on first curtain click
  const [audioStarted, setAudioStarted] = useState(false)

  return (
    <main className="bg-white">
      {/* Fixed overlays */}
      <BrandBadge />
      <LanguageSwitcher />
      <AudioPlayer startPlaying={audioStarted} />

      {/* Sections in order */}
      <IntroCurtainSection
        onFirstClick={() => setAudioStarted(true)}
        onComplete={() => {}}
      />
      <ScratchRevealSection />
      <CountdownSection />
      <VenueSection />
      <MenuSection />
      <DressCodeSection />
      <GiftsSection />
      <TransportSection />
      <RSVPSection />
      <ThankYouCard />
    </main>
  )
}
