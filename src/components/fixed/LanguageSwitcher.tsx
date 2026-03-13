import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import type { Language } from '../../types'

const LANGS: Language[] = ['en', 'it']

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="fixed top-4 right-4 z-[9999] flex items-center gap-1 backdrop-blur-sm rounded-full p-1"
      style={{
        backgroundColor: 'rgba(250, 248, 245, 0.6)',
        border: '1px solid rgba(92, 32, 24, 0.2)',
      }}
    >
      {LANGS.map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className="px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 uppercase"
          style={
            language === lang
              ? { backgroundColor: '#5C2018', color: 'white' }
              : { backgroundColor: 'transparent', color: '#5C2018' }
          }
        >
          {lang}
        </button>
      ))}
    </motion.div>
  )
}
