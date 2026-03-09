import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import projets      from '@/data/projets.json'

import ProjectHero  from '@/components/projet/ProjectHero'
import Chapter      from '@/components/projet/Chapter'
import PhotoGallery from '@/components/projet/PhotoGallery'
import ProjectNav   from '@/components/projet/ProjectNav'
import Footer       from '@/components/layout/Footer'

interface Props {
  params: { slug: string }
}

/* ── Génération statique ─────────────────────── */
export function generateStaticParams() {
  return projets.map((p) => ({ slug: p.slug }))
}

/* ── Metadata dynamique ──────────────────────── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const projet = projets.find((p) => p.slug === params.slug)
  if (!projet) return {}

  const typeLabel =
    projet.category === 'video'
      ? 'Vidéo'
      : projet.category === 'photo'
      ? 'Photographie'
      : 'Direction Artistique'

  return {
    title:       `${projet.title} — Alexis Bossy`,
    description: `${typeLabel} · ${projet.client} · ${projet.year}`,
  }
}

/* ── Page ────────────────────────────────────── */
export default function ProjetPage({ params }: Props) {
  const projet = projets.find((p) => p.slug === params.slug)
  if (!projet) notFound()

  return (
    <main>
      {/* Hero plein écran */}
      <ProjectHero projet={projet} />

      {/* Layout photo-gallery ou chapitres standard */}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {(projet as any).layout === 'photo-gallery' ? (
        <PhotoGallery
          title={projet.title}
          client={projet.client}
          year={projet.year}
          category={projet.category}
          /* eslint-disable @typescript-eslint/no-explicit-any */
          galleryText={(projet as any).galleryText}
          galleryImages={(projet as any).galleryImages}
          /* eslint-enable @typescript-eslint/no-explicit-any */
        />
      ) : (
        projet.chapters.map((chapter) => (
          <Chapter
            key={chapter.number}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            chapter={chapter as any}
          />
        ))
      )}

      {/* Navigation prev / next */}
      <ProjectNav currentSlug={projet.slug} />

      <Footer />
    </main>
  )
}
