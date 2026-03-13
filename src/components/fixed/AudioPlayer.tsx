import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { useAudio } from '../../hooks/useAudio'

interface AudioPlayerProps {
  startPlaying: boolean
}

export function AudioPlayer({ startPlaying }: AudioPlayerProps) {
  const { isPlaying, toggle } = useAudio(startPlaying)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <button
        onClick={toggle}
        className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
        style={{ backgroundColor: 'white', border: '2px solid #5C2018' }}
        aria-label={isPlaying ? 'Mute music' : 'Play music'}
      >
        {isPlaying ? (
          <Volume2 size={20} style={{ color: '#5C2018' }} />
        ) : (
          <VolumeX size={20} style={{ color: '#5C2018' }} />
        )}
      </button>
    </motion.div>
  )
}
