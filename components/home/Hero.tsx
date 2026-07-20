'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import ShowreelModal from './ShowreelModal'
import Magnetic from '@/components/motion/Magnetic'

/* Séquence de rôles — encode la répartition 40 / 40 / 20.
   Sur 5 rotations : 2 photographe, 2 vidéaste, 1 directeur artistique.
   Ne pas ajouter de rôle ici sans recalculer la proportion. */
const ROLES = ['Photographe', 'Vidéaste', 'Photographe', 'Vidéaste', 'Directeur artistique']

/* Visuels de fond — les vraies images des projets, pas un stock.
   Le premier est chargé en priorité (c'est le LCP), les autres en lazy. */
const FRAMES = [
  '/images/projets/st-ferre-coupe-haute-loire/A7401121.jpg',
  '/images/projets/studio-lens/HERO.webp',
  '/images/projets/fc-saint-joseph/HERO.webp',
  '/images/projets/bouillon-de-famille/HERO.webp',
]

const SHOWREEL_ID = 'DAUCaCJ1fBM'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [frame, setFrame] = useState(0)
  const [role, setRole] = useState(0)
  const [reelOpen, setReelOpen] = useState(false)

  /* Crossfade des visuels + rotation des rôles.
     Deux horloges distinctes et volontairement non synchrones : les rôles
     tournent plus vite que les images, sinon tout bat au même rythme et
     l'ensemble a l'air mécanique. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const fi = setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), 5200)
    const ri = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2600)
    return () => { clearInterval(fi); clearInterval(ri) }
  }, [])

  /* L'entrée est en CSS (.hero-rise), pas en GSAP. Une animation JS sur le
     tout premier écran dépend du rAF et du cycle de montage de React : en
     StrictMode le contexte est reverté au milieu du tween et les éléments
     restent figés à mi-opacité. Une keyframe CSS part au premier paint,
     tourne sur le compositeur et se termine quoi qu'il arrive. */

  /* Sortie au scroll — le média rétrécit et s'arrondit pendant que le contenu
     s'efface. Piloté en CSS var pour rester sur le compositeur (pas de reflow).
     Purement décoratif : si le rAF ne tourne pas, le hero reste plein cadre. */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      raf = 0
      const h = window.innerHeight
      // Avant la première mise en page, innerHeight peut valoir 0 : la division
      // donnerait NaN, --exit deviendrait invalide et le hero passerait à
      // opacity 0 sans jamais revenir (rien ne le recalculerait sans scroll).
      if (!h) return
      // 0 en haut de page → 1 quand le hero a défilé d'un écran
      const p = Math.min(1, Math.max(0, window.scrollY / h))
      el.style.setProperty('--exit', String(p))
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
    <section id="hero" ref={sectionRef} className="hero">

      {/* Média — pile de visuels en fondu enchaîné */}
      <div className="hero__media" aria-hidden="true">
        {FRAMES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`hero__frame${i === frame ? ' is-active' : ''}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        ))}
        <div className="hero__grain" />
        <div className="hero__scrim" />
      </div>

      {/* Contenu */}
      <div className="hero__inner">

        <div className="hero__top hero-rise">
          <span className="hero__pill">
            <span className="hero__dot" />
            Disponible pour vos projets
          </span>
        </div>

        <div className="hero__bottom">
          <h1 className="hero__title hero-rise">
            <span className="hero__name">Alexis Bossy</span>
            <span className="hero__roles" aria-live="polite">
              {ROLES.map((r, i) => (
                <span
                  key={`${r}-${i}`}
                  className={`hero__role${i === role ? ' is-active' : ''}`}
                  aria-hidden={i !== role}
                >
                  {r}
                </span>
              ))}
              {/* Réserve la largeur du plus long rôle pour que rien ne saute */}
              <span className="hero__role hero__role--ghost">Directeur artistique</span>
            </span>
          </h1>

          <div className="hero__actions hero-rise">
            <Magnetic strength={0.3}>
              <Link href="/travaux" className="hero__btn hero__btn--solid" data-cursor="TRAVAUX">
                Voir les travaux
                <span aria-hidden="true">→</span>
              </Link>
            </Magnetic>

            <Magnetic strength={0.3}>
              <button
                type="button"
                className="hero__btn hero__btn--ghost"
                onClick={() => setReelOpen(true)}
                data-cursor="LECTURE"
              >
                <span className="hero__play" aria-hidden="true">▶</span>
                Showreel
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="hero__cue" aria-hidden="true">
          <span className="hero__cue-line" />
          <span className="hero__cue-label">Défiler</span>
        </div>
      </div>

      {reelOpen && (
        <ShowreelModal videoId={SHOWREEL_ID} onClose={() => setReelOpen(false)} />
      )}
    </section>
  )
}
