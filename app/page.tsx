import Hero from '@/components/home/Hero'
import Bento from '@/components/home/Bento'
import ProjectsGrid from '@/components/home/ProjectsGrid'
import About from '@/components/home/About'
import Footer from '@/components/layout/Footer'
import projets from '@/data/projets.json'

export default function HomePage() {
  const featured = projets.filter((p) => p.featured)

  return (
    <main>
      <Hero />
      <Bento projets={featured.slice(0, 3)} />
      <ProjectsGrid projets={featured} />
      <About />
      <Footer />
    </main>
  )
}
