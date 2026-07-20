'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Reveal from '@/components/motion/Reveal'
import Link from 'next/link'
import Magnetic from '@/components/motion/Magnetic'

/* useLayoutEffect n'existe pas au rendu serveur et React le signale à chaque
   build. Le composant est prérendu statiquement, donc on bascule sur
   useEffect côté serveur — où il ne s'exécute de toute façon jamais. */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

interface Projet {
  slug: string
  title: string
  client: string
  category: string
  year: string
  cover?: string
  coverVideo?: string
  galleryText?: string
  galleryImages?: string[]
  metaDescription?: string
}

interface Props {
  projets: Projet[]
}

const CATEGORIES: Record<string, string> = {
  photo:         'Photographie',
  video:         'Vidéo',
  'video-photo': 'Vidéo & photographie',
  autres:        'Direction artistique',
}

/* Les metaDescription sont préfixées "Catégorie · Client · Année — ".
   On ne garde que la phrase, le préfixe est déjà affiché ailleurs. */
function lead(p: Projet): string {
  if (p.galleryText) return p.galleryText
  const meta = p.metaDescription ?? ''
  const dash = meta.indexOf('—')
  return dash === -1 ? meta : meta.slice(dash + 1).trim()
}

/* Une seule statistique, et seulement quand elle est vraie :
   le nombre de visuels réellement présents dans la galerie. */
function count(p: Projet): string | null {
  const n = p.galleryImages?.length ?? 0
  return n >= 6 ? `${n} visuels` : null
}

export default function Showcase({ projets }: Props) {
  const n = projets.length

  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const fillRef    = useRef<HTMLSpanElement>(null)
  const thumbRefs  = useRef<(HTMLAnchorElement | null)[]>([])

  const [index, setIndex]   = useState(0)
  const [offset, setOffset] = useState(0)

  /* ── Index piloté par le scroll ──────────────────────────────────────────
     C'est la différence de fond avec un carrousel : sur mobile il n'y a rien
     à toucher, on scrolle et les projets défilent. Les flèches et les
     vignettes ne changent donc pas l'état directement — elles déplacent le
     scroll, qui reste la seule source de vérité. Sans ça, clic et scroll se
     contredisent dès que l'utilisateur fait les deux.                        */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const runway = el.offsetHeight - window.innerHeight
      if (runway <= 0) return

      const p = Math.min(1, Math.max(0, -rect.top / runway))

      /* La barre est écrite directement dans le DOM : la passer par un state
         re-rendrait tout le module (7 fonds + 7 vignettes) à chaque frame de
         scroll, ce qui suffit à faire tomber la page sous les 60 fps.
         Seul l'index passe par React — il ne change que 7 fois. */
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${p})`
      setIndex((prev) => {
        const next = Math.min(n - 1, Math.floor(p * n))
        return next === prev ? prev : next
      })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [n])

  /* ── Recentrage du rail de vignettes ─────────────────────────────────────
     useLayoutEffect : mesurer puis peindre dans la même frame, sinon le rail
     part de la mauvaise position et on voit un saut au premier rendu.        */
  const reposition = useCallback(() => {
    const track = trackRef.current
    const thumb = thumbRefs.current[index]
    const viewport = track?.parentElement
    if (!track || !thumb || !viewport) return

    const centered = viewport.clientWidth / 2 - (thumb.offsetLeft + thumb.offsetWidth / 2)
    /* On borne le décalage : avec sept vignettes le rail tient dans la largeur
       de l'écran, et centrer la première laisserait la moitié gauche vide tout
       en rognant la vignette active. Le rail ne glisse donc que s'il déborde
       vraiment — sinon il reste calé à gauche et seul le style de la vignette
       active signale la position. */
    const min = Math.min(0, viewport.clientWidth - track.scrollWidth)
    setOffset(Math.max(min, Math.min(0, centered)))
  }, [index])

  useIsomorphicLayoutEffect(reposition, [reposition])

  /* Le calcul dépend de largeurs mesurées. S'il ne tourne qu'au changement
     d'index, une mesure prise avant que la mise en page soit stabilisée
     (polices, images) reste figée pour de bon — et une rotation d'écran
     laisse le rail décalé. Un ResizeObserver le refait à chaque fois que la
     géométrie bouge réellement, y compris au premier calage. */
  useEffect(() => {
    const viewport = trackRef.current?.parentElement
    if (!viewport || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(reposition)
    ro.observe(viewport)
    return () => ro.disconnect()
  }, [reposition])

  /* Aller à un projet = déplacer le scroll au milieu de son segment. */
  const goTo = useCallback((i: number) => {
    const el = sectionRef.current
    if (!el) return
    const clamped = Math.min(n - 1, Math.max(0, i))
    const runway = el.offsetHeight - window.innerHeight
    // rect + scrollY plutôt qu'offsetTop : offsetTop est relatif à
    // l'offsetParent, que la marge négative du hero rend peu fiable.
    const top = el.getBoundingClientRect().top + window.scrollY
    const y = top + ((clamped + 0.5) / n) * runway

    const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number) => void } }).__lenis
    if (lenis) lenis.scrollTo(y)
    else window.scrollTo({ top: y, behavior: 'smooth' })
  }, [n])

  /* Pas de raccourci flèches ici : le module occupe sept écrans de scroll, et
     y capturer les flèches priverait le clavier de son moyen normal de
     parcourir la page pendant tout ce temps. Les vignettes et les boutons
     précédent/suivant sont focusables, ça suffit. */

  const current = projets[index]
  if (!current) return null

  return (
    <section
      ref={sectionRef}
      className="sc"
      style={{ height: `calc(100svh + ${(n - 1) * 80}svh)` }}
      aria-roledescription="galerie défilante"
    >
      <div className="sc__sticky">

        {/* Fonds en fondu enchaîné. Les voisins immédiats sont chargés en
            avance : sans ça le fondu révèle un cadre vide au premier passage. */}
        <div className="sc__bgs" aria-hidden="true">
          {projets.map((p, i) => (
            <div
              key={p.slug}
              className={`sc__bg${i === index ? ' is-active' : ''}`}
              style={{ backgroundImage: p.cover ? `url(${p.cover})` : undefined }}
            />
          ))}
          {projets.map((p, i) =>
            Math.abs(i - index) === 1 && p.cover
              ? <img key={`pre-${p.slug}`} src={p.cover} alt="" className="sc__preload" decoding="async" />
              : null,
          )}
        </div>
        <div className="sc__scrim" aria-hidden="true" />

        {/* En-tête */}
        <header className="sc__header">
          <span className="sc__eyebrow">
            <span className="sc__eyebrow-dash" />
            Sélection de projets
          </span>
        </header>

        {/* Contenu du projet courant */}
        <div className="sc__content" aria-live="polite" aria-atomic="true">
          <p className="sc__client">
            {current.client} · {CATEGORIES[current.category] ?? current.category}
          </p>

          {/* key : force React à remonter le titre à chaque projet, ce qui
              relance la révélation mot à mot. Sans key, le texte change mais
              l'animation ne rejoue pas. */}
          <Reveal as="h2" split key={`t-${current.slug}`} className="sc__title" stagger={0.035}>
            {current.title}
          </Reveal>

          <p key={`l-${current.slug}`} className="sc__lead">{lead(current)}</p>

          <p className="sc__meta">
            {current.year}
            {count(current) && <> · {count(current)}</>}
          </p>

          <Magnetic strength={0.3}>
            <Link href={`/projet/${current.slug}`} className="sc__cta" data-cursor="OUVRIR">
              Voir le projet <span aria-hidden="true">↗</span>
            </Link>
          </Magnetic>
        </div>

        {/* Rail de vignettes */}
        <div className="sc__thumbs">
          <div className="sc__thumbs-viewport">
            <div
              ref={trackRef}
              className="sc__thumbs-track"
              style={{ transform: `translate3d(${offset}px,0,0)` }}
            >
              {projets.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/projet/${p.slug}`}
                  ref={(el) => { thumbRefs.current[i] = el }}
                  className={`sc__thumb${i === index ? ' is-active' : ''}`}
                  aria-current={i === index ? 'true' : undefined}
                  aria-label={i === index
                    ? `Voir le projet ${p.title} — ${p.client}`
                    : `Afficher ${p.title} — ${p.client}`}
                  data-cursor={i === index ? 'OUVRIR' : 'AFFICHER'}
                  /* Une vignette inactive sert d'abord à naviguer dans le
                     module ; on n'ouvre le projet que si elle est déjà active. */
                  onClick={(e) => {
                    if (i !== index) { e.preventDefault(); goTo(i) }
                  }}
                >
                  <span
                    className="sc__thumb-img"
                    style={{ backgroundImage: p.cover ? `url(${p.cover})` : undefined }}
                  />
                  <span className="sc__thumb-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="sc__thumb-label">{p.client}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="sc__controls">
            <button
              className="sc__nav"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label="Projet précédent"
            >←</button>
            <button
              className="sc__nav"
              onClick={() => goTo(index + 1)}
              disabled={index === n - 1}
              aria-label="Projet suivant"
            >→</button>
            <span className="sc__counter">
              {String(index + 1).padStart(2, '0')}<span>/ {String(n).padStart(2, '0')}</span>
            </span>
          </div>
        </div>

        <div className="sc__progress" aria-hidden="true">
          <span ref={fillRef} className="sc__progress-fill" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
    </section>
  )
}
