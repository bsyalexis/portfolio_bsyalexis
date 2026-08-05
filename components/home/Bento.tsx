'use client'

import { useEffect, useRef } from 'react'
import Reveal from '@/components/motion/Reveal'

const IMGS = [
  '/A7403250.webp',
  '/A7402929.webp',
  '/A7404198.webp',
  '/DSC01261.webp',
]


export default function Bento() {
  const sectionRef = useRef<HTMLElement>(null)

  /* Parallaxe. Un seul écouteur écrit la progression de la section dans une
     variable CSS ; chaque image applique ensuite sa propre vitesse. Passer par
     le CSS plutôt que de déplacer quatre éléments en JavaScript garde tout le
     travail sur le compositeur, et il n'y a qu'une mesure par frame. */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const span = window.innerHeight + r.height
      if (span <= 0) return
      // 0 quand la section entre par le bas, 1 quand elle sort par le haut.
      const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / span))
      el.style.setProperty('--p', p.toFixed(4))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section ref={sectionRef} className="bento">
      <div className="bento__grid">

        {/* Grande image, à gauche */}
        <Reveal className="bento__cell bento__cell--main">
          <img src={IMGS[0]} alt="" loading="eager" decoding="async" style={{ '--speed': '58px' } as React.CSSProperties} />
          <div className="bento__overlay">
            <p className="bento__tagline">
              <span>Des images qui parlent</span>
              <strong>pour vous.</strong>
            </p>
          </div>
        </Reveal>

        <div className="bento__col">
          <Reveal delay={0.08} className="bento__cell bento__cell--tall">
            <img src={IMGS[1]} alt="" loading="lazy" decoding="async" style={{ '--speed': '-46px' } as React.CSSProperties} />
          </Reveal>

          <div className="bento__row">
            <Reveal delay={0.16} className="bento__cell">
              <img src={IMGS[2]} alt="" loading="lazy" decoding="async" style={{ '--speed': '38px' } as React.CSSProperties} />
            </Reveal>
            <Reveal delay={0.24} className="bento__cell">
              <img src={IMGS[3]} alt="" loading="lazy" decoding="async" style={{ '--speed': '-32px' } as React.CSSProperties} />
            </Reveal>
          </div>
        </div>

        {/* Chips de réassurance, hors des cellules : posées à cheval sur les
            bords de la mosaïque, elles flottent au-dessus de la composition
            au lieu d'être enfermées dans une photo. Leur parallaxe est
            inversée par rapport aux images, et c'est ce contre-mouvement qui
            donne l'impression qu'elles sont détachées du plan. */}
        <Reveal delay={0.3} className="bento__float bento__float--projects">
          <p className="bento__card bento__stat">
            <strong>3</strong>
            Expertises · photo, vidéo, DA
          </p>
        </Reveal>
        <Reveal delay={0.4} className="bento__float bento__float--xp">
          <p className="bento__card bento__stat">
            <strong>8<span>+</span></strong>
            Années d&rsquo;expérience
          </p>
        </Reveal>
        <Reveal delay={0.5} className="bento__float bento__float--clients">
          <p className="bento__card bento__stat">
            <strong>60<span>+</span></strong>
            Clients accompagnés
          </p>
        </Reveal>

      </div>
    </section>
  )
}
