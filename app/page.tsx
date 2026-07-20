import Hero from '@/components/home/Hero'
import Bento from '@/components/home/Bento'
import Works from '@/components/home/Works'
import Marquee from '@/components/home/Marquee'
import About from '@/components/home/About'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* La mosaïque enchaîne sur le hero, puis les travaux sont présentés en
          blocs éditoriaux — un par métier — plutôt qu'en carrousel collant.
          Le bandeau referme la séquence avant la présentation. */}
      <Bento />
      <Works />
      <Marquee />
      <About />
      <Footer />
    </main>
  )
}
