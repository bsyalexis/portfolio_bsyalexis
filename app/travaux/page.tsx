import { Metadata } from 'next'
import projets        from '@/data/projets.json'
import TravauxContent from '@/components/travaux/TravauxContent'
import Footer         from '@/components/layout/Footer'

export const metadata: Metadata = {
  title:       'Travaux — Alexis Bossy',
  description: 'Tous les projets de vidéo, photographie et direction artistique.',
}

const projetsTries = [...projets].sort((a, b) => {
  const da = (a as { date?: string }).date ?? a.year
  const db = (b as { date?: string }).date ?? b.year
  return db.localeCompare(da)
})

export default function TravauxPage() {
  return (
    <main style={{ background: 'var(--bg)' }}>
      <TravauxContent projets={projetsTries} />
      <Footer />
    </main>
  )
}
