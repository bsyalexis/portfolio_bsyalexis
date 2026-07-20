import Hero from '@/components/home/Hero'
import Showcase from '@/components/home/Showcase'
import Bento from '@/components/home/Bento'
import Marquee from '@/components/home/Marquee'
import About from '@/components/home/About'
import Footer from '@/components/layout/Footer'
import projets from '@/data/projets.json'

export default function HomePage() {
  const featured = projets.filter((p) => p.featured)

  return (
    <main>
      <Hero />
      {/* Le showcase enchaîne directement sur le hero : deux modules sombres
          qui se répondent, puis Bento ramène le fond clair avant l'about. */}
      <Showcase projets={featured} />
      {/* Le bandeau prolonge le noir du showcase et sert de respiration avant
          le retour au fond clair. */}
      <Marquee />
      <Bento />
      <About />
      <Footer />
    </main>
  )
}
