import { Metadata } from 'next'
import projets        from '@/data/projets.json'
import TravauxContent from '@/components/travaux/TravauxContent'
import TravauxCTA     from '@/components/travaux/TravauxCTA'

export const metadata: Metadata = {
  title:       'Travaux — Alexis Bossy',
  description: 'Tous les projets de vidéo, photographie et direction artistique.',
}

export default function TravauxPage() {
  return (
    <main style={{ background: 'var(--bg)' }}>
      <TravauxContent projets={projets} />
      <TravauxCTA />
    </main>
  )
}
