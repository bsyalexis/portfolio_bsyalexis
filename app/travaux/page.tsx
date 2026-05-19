import { Metadata } from 'next'
import projets        from '@/data/projets.json'
import TravauxContent from '@/components/travaux/TravauxContent'
import Footer         from '@/components/layout/Footer'

export const metadata: Metadata = {
  title:       'Travaux — Alexis Bossy',
  description: 'Tous les projets de photographie et vidéo.',
}

export default function TravauxPage() {
  return (
    <main style={{ background: 'var(--bg)' }}>
      <TravauxContent projets={projets} />
      <Footer />
    </main>
  )
}
