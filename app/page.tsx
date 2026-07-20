import Hero from '@/components/home/Hero'
import Bento from '@/components/home/Bento'
import Showcase from '@/components/home/Showcase'
import Marquee from '@/components/home/Marquee'
import About from '@/components/home/About'
import Footer from '@/components/layout/Footer'
import projets from '@/data/projets.json'

export default function HomePage() {
  const featured = projets.filter((p) => p.featured)

  return (
    <main>
      <Hero />
      {/* La mosaïque enchaîne directement sur le hero : une respiration claire
          et courte avant d'entrer dans la sélection de projets, qui repasse au
          noir. Le bandeau prolonge ce noir jusqu'au retour au fond clair. */}
      <Bento />
      <Showcase projets={featured} />
      <Marquee />
      <About />
      <Footer />
    </main>
  )
}
