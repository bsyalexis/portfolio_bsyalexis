import Hero from '@/components/home/Hero'
import Bento from '@/components/home/Bento'
import Works from '@/components/home/Works'
import Parcours from '@/components/home/Parcours'
import About from '@/components/home/About'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* La mosaïque enchaîne sur le hero, puis les travaux sont présentés en
          blocs éditoriaux — un par métier — plutôt qu'en carrousel collant.
          Le parcours pose les bascules en quatre jalons, la bio détaille. */}
      <Bento />
      <Works />
      <Parcours />
      <About />
      <Footer />
    </main>
  )
}
