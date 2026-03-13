import { useRef, useState, useEffect, useCallback } from 'react'

// ── AUDIO SOURCE ───────────────────────────────────────────────────────────
// TODO: Replace the empty string with the imported audio file once available:
//   import introMusic from '../assets/audio/intro-music.mp3'
//   export const AUDIO_SRC = introMusic
export const AUDIO_SRC = '' // placeholder

interface AudioState {
  isPlaying: boolean
  toggle: () => void
}

export function useAudio(startPlaying: boolean): AudioState {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Create audio element once
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC)
    audio.loop = true
    audio.volume = 0.5
    audioRef.current = audio

    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  // Auto-play when startPlaying becomes true
  useEffect(() => {
    if (!startPlaying || !audioRef.current || !AUDIO_SRC) return
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
  }, [startPlaying])

  // Pause on tab hide, resume on return
  useEffect(() => {
    function onVisibility() {
      if (!audioRef.current) return
      if (document.hidden) {
        audioRef.current.pause()
      } else if (isPlaying) {
        audioRef.current.play().catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [isPlaying])

  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }, [isPlaying])

  return { isPlaying, toggle }
}
