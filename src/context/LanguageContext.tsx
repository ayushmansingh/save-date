import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Language } from '../types'
import { en } from '../i18n/en'
import { it } from '../i18n/it'

const translations: Record<Language, Record<string, string>> = { en, it }

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  function t(key: string): string {
    return translations[language][key] ?? translations['en'][key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
