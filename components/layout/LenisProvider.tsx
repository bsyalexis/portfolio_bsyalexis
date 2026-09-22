'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { setLenis } from '@/lib/lenis'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    /* Lenis n'intercepte que la molette (`smoothWheel`) : sur un écran
       tactile il ne change rien au geste de défilement, mais sa boucle rAF
       continue de lire et réécrire la position à chaque frame pendant toute
       la visite. C'est du travail principal thread pur, et c'est l'une des
       sources des recalculs de mise en page forcés relevés par Lighthouse
       sur mobile. On ne l'instancie donc que là où il sert vraiment. */
    const fine = window.matchMedia('(pointer: fine)').matches
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || calm) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    setLenis(lenis)

    let rafId = 0
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      setLenis(null)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
