'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import ShowreelModal from './ShowreelModal'
import Magnetic from '@/components/motion/Magnetic'

/* Séquence de rôles — encode la répartition 40 / 40 / 20.
   Sur 5 rotations : 2 photographe, 2 vidéaste, 1 directeur artistique.
   Ne pas ajouter de rôle ici sans recalculer la proportion. */
const ROLES = ['Photographe', 'Vidéaste', 'Photographe', 'Vidéaste', 'Directeur artistique']

/* Boucle de fond. VP9/WebM : le seul format vidéo présent dans le dépôt.
   Un compagnon H.264/MP4 couvrirait les navigateurs plus anciens, mais il
   demande un ffmpeg qui n'est pas installé ici — d'où le repli images
   ci-dessous, qui prend le relais dès que la lecture échoue. */
const VIDEO  = '/images/projets/eva-cl/CONVERGENCE.webm'
const POSTER = '/images/projets/eva-cl/3.webp'

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
  const [role, setRole]         = useState(0)
  const [reelOpen, setReelOpen] = useState(false)
  const [useVideo, setUseVideo] = useState(false)

  /* Décide au montage si la vidéo est appropriée. Trois refus : petit écran
     (data mobile), mouvement réduit, et mode économie de données annoncé par
     le navigateur. Dans ces cas le fondu d'images fait le travail. */
  useEffect(() => {
    const small = window.matchMedia('(max-width: 767px)').matches
    const calm  = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const conn  = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    setUseVideo(!small && !calm && !conn?.saveData)
  }, [])

  /* Crossfade des visuels + rotation des rôles. Le fondu d'images ne tourne
     que s'il est réellement affiché — inutile de faire battre une horloge
     derrière une vidéo opaque. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ri = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2600)
    const fi = useVideo
      ? null
      : setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), 5200)

    return () => { clearInterval(ri); if (fi) clearInterval(fi) }
  }, [useVideo])

  /* Sortie au scroll — le média rétrécit et s'arrondit pendant que le contenu
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
            /* Si le navigateur ne sait pas lire le VP9, on bascule sur le
               fondu d'images plutôt que de laisser un cadre noir. */
            onError={() => setUseVideo(false)}
          >
            <source src={VIDEO} type="video/webm" />
          </video>
        ) : (
          FRAMES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`hero__frame${i === frame ? ' is-active' : ''}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
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
