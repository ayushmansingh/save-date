import { useState } from 'react'
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
  const [audioStarted, setAudioStarted] = useState(false)

  return (
    <main className="bg-white">
      <AudioPlayer startPlaying={audioStarted} />

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
