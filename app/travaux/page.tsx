import Grid from '@/components/travaux/Grid'
import Filters from '@/components/travaux/Filters'

export const metadata = {
  title: 'Travaux — Alexis Bossy',
}

export default function TravauxPage() {
  return (
    <main>
      <div className="container" style={{ paddingTop: '80px' }}>
        <h1 style={{ fontWeight: 300, fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>Travaux</h1>
        <Filters />
      </div>
      <Grid />
    </main>
  )
}
