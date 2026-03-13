import { Toaster } from 'sonner'
import { PageShell } from './components/layout/PageShell'

export default function App() {
  return (
    <>
      <PageShell />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: { fontFamily: 'Lora, serif', color: '#5C2018' },
        }}
      />
    </>
  )
}
