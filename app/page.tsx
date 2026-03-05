import Hero from '@/components/home/Hero'
import Bento from '@/components/home/Bento'
import Stats from '@/components/home/Stats'
import EditoSplit from '@/components/home/EditoSplit'
import ProjectsGrid from '@/components/home/ProjectsGrid'
import Services from '@/components/home/Services'
import About from '@/components/home/About'
import Footer from '@/components/layout/Footer'
import projets from '@/data/projets.json'

export default function HomePage() {
  const featured = projets.filter((p) => p.featured)

  return (
    <main>
      <Hero />
      <Bento projets={featured.slice(0, 3)} />
      <Stats />
      <EditoSplit />
      <ProjectsGrid projets={featured} />
      <Services />
      <About />
      <Footer />
    </main>
  )
}
