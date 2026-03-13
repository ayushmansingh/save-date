import { Toaster } from 'sonner'
import { LanguageProvider } from './context/LanguageContext'
import { PageShell } from './components/layout/PageShell'

export default function App() {
  return (
    <LanguageProvider>
      <PageShell />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: { fontFamily: 'Lora, serif', color: '#5C2018' },
        }}
      />
    </LanguageProvider>
  )
}
