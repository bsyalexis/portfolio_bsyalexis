import projets from '@/data/projets.json'
import ProjectHero from '@/components/projet/ProjectHero'
import Chapter from '@/components/projet/Chapter'
import { notFound } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return projets.map((p) => ({ slug: p.slug }))
}

export default function ProjetPage({ params }: Props) {
  const projet = projets.find((p) => p.slug === params.slug)
  if (!projet) notFound()

  return (
    <main>
      <ProjectHero />
      {projet.chapters.map((chapter) => (
        <Chapter key={chapter.number} />
      ))}
    </main>
  )
}
