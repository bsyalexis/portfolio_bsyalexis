'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ShowreelModal from './ShowreelModal'
import Magnetic from '@/components/motion/Magnetic'
import { TextEffect } from '@/components/motion-primitives/text-effect'

/* Séquence de rôles : encode la répartition 40 / 40 / 20.
   Sur 5 rotations : 2 photographe, 2 vidéaste, 1 directeur artistique.
   Ne pas ajouter de rôle ici sans recalculer la proportion. */
const ROLES = ['Photographe', 'Vidéaste', 'Photographe', 'Vidéaste', 'Directeur artistique']

/* Entrée par le bas dans le flou, sortie vers le haut : le mot suivant
   semble pousser le précédent. Décalages en em pour suivre la taille du
   texte (le preset d'origine monte de 20px, trop pour un sous-titre). */
const ROLE_VARIANTS = {
  item: {
    hidden:  { opacity: 0, y: '0.4em', filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit:    { opacity: 0, y: '-0.4em', filter: 'blur(6px)' },
  },
}

/* Boucle de fond : le showreel encodé en AV1 (MP4). AV1 pèse nettement moins
   que le VP9 à qualité égale, mais tous les navigateurs ne le décodent pas
   (Safari selon la machine), d'où le repli images ci-dessous, qui prend le
   relais dès que la lecture échoue. */
const VIDEO  = '/videos/SHOWREEL.mp4'
const POSTER = '/videos/SHOWREEL_poster.webp'

/* Repli : les vraies images des projets, également servies sur mobile pour
   ne pas imposer 4 Mo de vidéo en 4G. */
const FRAMES = [
  '/images/projets/st-ferre-coupe-haute-loire/A7401121.jpg',
  '/images/projets/studio-lens/HERO.webp',
  '/images/projets/fc-saint-joseph/HERO.webp',
  '/images/projets/bouillon-de-famille/HERO.webp',
]

const SHOWREEL_ID = 'DAUCaCJ1fBM'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const [frame, setFrame]       = useState(0)
  /* Nombre de visuels réellement montés. Les quatre sont dans le cadre du
     hero (absolus, inset 0) : les marquer `lazy` ne sert à rien, le
     navigateur les considère visibles et les télécharge tous les quatre au
     chargement. On ne les introduit donc qu'au fil du fondu : un seul
     visuel dans le premier écran au lieu de quatre. */
  const [mounted, setMounted]   = useState(1)
  const [role, setRole]         = useState(0)
  const [reelOpen, setReelOpen] = useState(false)
  const [useVideo, setUseVideo] = useState(false)
  /* Un échec de décodage est définitif pour la session : sans ce drapeau, la
     réévaluation ci-dessous remonterait une vidéo que le navigateur vient de
     refuser, en boucle à chaque redimensionnement. */
  const videoFailed = useRef(false)

  /* Décide si la vidéo est appropriée. Trois refus : petit écran (data
     mobile), mouvement réduit, et mode économie de données annoncé par le
     navigateur. Dans ces cas le fondu d'images fait le travail.

     Réévalué à chaque changement de largeur ou de préférence de mouvement :
     une fenêtre ouverte étroite puis élargie doit récupérer la vidéo, alors
     qu'une décision prise une seule fois au montage la condamnait pour toute
     la visite. */
  useEffect(() => {
    const smallQ = window.matchMedia('(max-width: 767px)')
    const calmQ  = window.matchMedia('(prefers-reduced-motion: reduce)')

    const decide = () => {
      // Une largeur nulle veut dire « pas encore mesuré », pas « écran
      // étroit ». Sans cette garde, la media query matche au premier rendu et
      // un écran large se voit servir le repli images.
      const small = window.innerWidth > 0 && smallQ.matches
      const conn  = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      setUseVideo(!small && !calmQ.matches && !conn?.saveData && !videoFailed.current)
    }

    decide()
    smallQ.addEventListener('change', decide)
    calmQ.addEventListener('change', decide)
    window.addEventListener('resize', decide)
    return () => {
      smallQ.removeEventListener('change', decide)
      calmQ.removeEventListener('change', decide)
      window.removeEventListener('resize', decide)
    }
  }, [])

  /* Crossfade des visuels + rotation des rôles. Le fondu d'images ne tourne
     que s'il est réellement affiché : inutile de faire battre une horloge
     derrière une vidéo opaque. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ri = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2600)
    const fi = useVideo
      ? null
      : setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), 5200)

    return () => { clearInterval(ri); if (fi) clearInterval(fi) }
  }, [useVideo])

  /* Le visuel suivant est monté à mi-parcours du précédent : il a le temps
     d'arriver avant son tour, et il ne dispute pas la bande passante au
     premier écran. Une fois les quatre montés, plus rien à faire. */
  useEffect(() => {
    if (useVideo || mounted >= FRAMES.length) return
    const t = setTimeout(() => setMounted((m) => Math.min(FRAMES.length, m + 1)), 2600)
    return () => clearTimeout(t)
  }, [useVideo, mounted, frame])

  /* Sortie au scroll : le média rétrécit et s'arrondit pendant que le contenu
     s'efface. Piloté en CSS var pour rester sur le compositeur. */
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
      // opacity 0 sans jamais revenir.
      if (!h) return
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

  /* Économie : la vidéo est mise en pause quand le hero quitte l'écran.
     Sans ça elle continue de décoder pendant toute la visite. */
  useEffect(() => {
    const el = sectionRef.current
    const vid = videoRef.current
    if (!el || !vid) return

    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) vid.play().catch(() => {}) ; else vid.pause() },
      { threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [useVideo])

  return (
    <section id="hero" ref={sectionRef} className="hero">

      <div className="hero__media" aria-hidden="true">
        {useVideo ? (
          <video
            ref={videoRef}
            className="hero__video"
            poster={POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            /* Si le navigateur ne sait pas décoder l'AV1, on bascule sur le
               fondu d'images plutôt que de laisser un cadre noir. */
            onError={() => { videoFailed.current = true; setUseVideo(false) }}
          >
            <source src={VIDEO} type="video/mp4" />
          </video>
        ) : (
          FRAMES.slice(0, mounted).map((src, i) => (
            /* next/image plutôt qu'une balise brute : les sources font 2000px
               de large, et sans srcset un téléphone téléchargeait chacune en
               pleine résolution pour un cadre de 375px. `sizes="100vw"`
               laisse Next servir le palier juste au-dessus de la largeur
               réelle, en AVIF quand le navigateur l'accepte. */
            <Image
              key={src}
              src={src}
              alt=""
              fill
              sizes="100vw"
              quality={70}
              /* Le premier visuel est le LCP de la page sur mobile. `eager` +
                 priorité haute plutôt que `priority` : sur grand écran ce
                 fondu cède la place à la vidéo juste après l'hydratation, et
                 `priority` aurait posé dans le <head> un preload pleine
                 largeur pour une image aussitôt démontée. */
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              className={`hero__frame${i === frame ? ' is-active' : ''}`}
            />
          ))
        )}
        <div className="hero__grain" />
        <div className="hero__scrim" />
      </div>

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
              {/* Un seul rôle monté à la fois : Text Effect joue sa sortie
                  lettre par lettre avant de retirer le mot, et l'entrant
                  attend (delay) que le sortant ait disparu, pour ne jamais
                  laisser deux mots lisibles l'un sur l'autre. */}
              {ROLES.map((r, i) => (
                <TextEffect
                  key={`${r}-${i}`}
                  as="span"
                  per="char"
                  trigger={i === role}
                  delay={0.25}
                  speedReveal={1.6}
                  className="hero__role-fx"
                  variants={ROLE_VARIANTS}
                >
                  {r}
                </TextEffect>
              ))}
              {/* Réserve la largeur du plus long rôle pour que rien ne saute */}
              <span className="hero__role hero__role--ghost">Directeur artistique</span>
            </span>
          </h1>

          <div className="hero__actions hero-rise">
            <Magnetic strength={0.3}>
              <Link href="/travaux" className="hero__btn hero__btn--solid">
                Voir les travaux
                <span aria-hidden="true">→</span>
              </Link>
            </Magnetic>

            <Magnetic strength={0.3}>
              <button
                type="button"
                className="hero__btn hero__btn--ghost"
                onClick={() => setReelOpen(true)}
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
