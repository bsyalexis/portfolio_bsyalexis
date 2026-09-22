'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

interface Visual {
  layout:     string
  images:     string[]
  vimeoId?:   string
  youtubeId?: string
  video?:     string   // fichier servi par le site (AV1), lu à la demande
  poster?:    string
  videos?:    string[]
}

interface Props {
  visual: Visual
  dark?:  boolean
}

/* Gradients placeholder : lumière simulée pour habiller les blocs sans image */
const GRAD = [
  'radial-gradient(ellipse at 35% 35%, rgba(255,255,255,0.18) 0%, transparent 55%), linear-gradient(155deg, #c8c0b8 0%, #a09080 50%, #7a7068 100%)',
  'radial-gradient(ellipse at 65% 30%, rgba(255,255,255,0.14) 0%, transparent 50%), linear-gradient(155deg, #b0b4b8 0%, #888c90 50%, #606468 100%)',
  'radial-gradient(ellipse at 40% 60%, rgba(255,255,255,0.12) 0%, transparent 55%), linear-gradient(155deg, #d0c8be 0%, #aca098 50%, #888078 100%)',
]

/* Le bloc occupe au plus la moitié de la largeur de page sur grand écran, et
   toute la largeur en dessous de 768px. */
const IMG_SIZES = '(max-width: 767px) 100vw, 55vw'

function ImgBlock({ src, grad, onClick }: { src: string; grad: string; onClick?: () => void }) {
  const inner = src ? (
    <Image src={src} alt="" fill sizes={IMG_SIZES} quality={74} style={{ objectFit: 'cover' }} />
  ) : null

  /* Cliquable : c'est un bouton, pas une div. Ouvrir la visionneuse doit être
     atteignable au clavier et annoncé comme une action. */
  if (onClick) {
    return (
      <button type="button" className="vb-img gallery-clickable" onClick={onClick}
        style={{ background: grad }} aria-label="Agrandir la photo">
        {inner}
      </button>
    )
  }
  return <div className="vb-img" style={{ background: grad }}>{inner}</div>
}

function VidBlock({ src }: { src: string }) {
  return (
    <video autoPlay loop muted playsInline className="vb-vid">
      <source src={src} type="video/webm" />
    </video>
  )
}

export default function VisualBlock({ visual }: Props) {
  const { layout, images } = visual
  const [lbIndex, setLbIndex] = useState<number | null>(null)

  const openLb  = useCallback((i: number) => setLbIndex(i), [])
  const closeLb = useCallback(() => setLbIndex(null), [])
  const prevLb  = useCallback(() => setLbIndex((i) => i !== null ? (i - 1 + images.length) % images.length : null), [images.length])
  const nextLb  = useCallback(() => setLbIndex((i) => i !== null ? (i + 1) % images.length : null), [images.length])

  const lightbox = lbIndex !== null && images.length > 0 ? (
    <Lightbox images={images} index={lbIndex} onClose={closeLb} onPrev={prevLb} onNext={nextLb} />
  ) : null

  /* ── FULL ──────────────────────────── */
  if (layout === 'full') {
    if (visual.vimeoId) {
      return (
        <div className="vb-media">
          <iframe
            src={`https://player.vimeo.com/video/${visual.vimeoId}?autoplay=0&title=0&byline=0&portrait=0`}
            allow="fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      )
    }
    /* Même traitement que Vimeo côté mise en page. Domaine -nocookie et
       `rel=0` comme la modale showreel : pas de cookie tant que le visiteur
       ne lance pas la lecture, et pas de suggestions d'autres chaînes en fin
       de vidéo. `loading="lazy"` parce que le bloc est sous la ligne de
       flottaison, l'iframe ne pèse rien tant qu'on n'a pas scrollé. */
    if (visual.youtubeId) {
      return (
        <div className="vb-media">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${visual.youtubeId}?rel=0&modestbranding=1&playsinline=1`}
            allow="fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      )
    }
    /* Vidéo servie par le site. `preload="none"` est ce qui rend un fichier
       lourd acceptable : tant que le visiteur ne lance pas la lecture, seul le
       poster est téléchargé, zéro octet de vidéo. Pas d'autoplay non plus,
       c'est un film qu'on regarde avec le son, pas une boucle d'ambiance.
       Source en video/mp4 sans codec-string, comme le hero : les navigateurs
       qui ne décodent pas l'AV1 échouent proprement et laissent le poster. */
    if (visual.video) {
      return (
        <div className="vb-media">
          <video controls preload="none" playsInline poster={visual.poster}>
            <source src={visual.video} type="video/mp4" />
          </video>
        </div>
      )
    }
    return (
      <>
        <div className="vb-media">
          <ImgBlock src={images[0] ?? ''} grad={GRAD[0]} onClick={() => openLb(0)} />
        </div>
        {lightbox}
      </>
    )
  }

  /* ── SPLIT EQUAL 50/50 ─────────────── */
  if (layout === 'split-equal') {
    return (
      <>
        <div className="vb-grid vb-grid--split2">
          {[0, 1].map((i) => (
            <ImgBlock key={i} src={images[i] ?? ''} grad={GRAD[i % GRAD.length]} onClick={() => openLb(i)} />
          ))}
        </div>
        {lightbox}
      </>
    )
  }

  /* ── SPLIT ASYMMETRIC 40/60 ────────── */
  if (layout === 'split-asymmetric') {
    return (
      <>
        <div className="vb-grid vb-grid--asym">
          {[0, 1].map((i) => (
            <ImgBlock key={i} src={images[i] ?? ''} grad={GRAD[i % GRAD.length]} onClick={() => openLb(i)} />
          ))}
        </div>
        {lightbox}
      </>
    )
  }

  /* ── BENTO GALLERY (9 images + 2 vidéos 16:9) ──
     Le placement des onze cellules est décrit en CSS et non ici : c'est ce qui
     permet à la version mobile de le redéfinir. Posé en style inline, il
     n'était plus rattrapable et donnait des colonnes de 123px à 375px. */
  if (layout === 'bento') {
    const vids = visual.videos ?? []
    const order = [
      { kind: 'v', idx: 0 }, { kind: 'i', idx: 0 },
      { kind: 'i', idx: 2 }, { kind: 'i', idx: 3 }, { kind: 'i', idx: 4 },
      { kind: 'i', idx: 1 }, { kind: 'v', idx: 1 },
      { kind: 'i', idx: 5 }, { kind: 'i', idx: 6 }, { kind: 'i', idx: 7 },
      { kind: 'i', idx: 8 },
    ] as const

    return (
      <>
        <div className="vb-bento">
          {order.map((c, pos) => (
            <div key={`${c.kind}${c.idx}`} className={`vb-bento__cell vb-bento__cell--${pos + 1}`}>
              {c.kind === 'v'
                ? <VidBlock src={vids[c.idx] ?? ''} />
                : <ImgBlock src={images[c.idx] ?? ''} grad={GRAD[c.idx % GRAD.length]} onClick={() => openLb(c.idx)} />}
            </div>
          ))}
        </div>
        {lightbox}
      </>
    )
  }

  /* ── SPLIT 3 colonnes égales ────────── */
  if (layout === 'split-3') {
    return (
      <>
        <div className="vb-grid vb-grid--split3">
          {[0, 1, 2].map((i) => (
            <ImgBlock key={i} src={images[i] ?? ''} grad={GRAD[i % GRAD.length]} onClick={() => openLb(i)} />
          ))}
        </div>
        {lightbox}
      </>
    )
  }

  /* ── GRID 3 colonnes : n images ─────── */
  if (layout === 'grid-3col') {
    // Une image seule sur sa dernière rangée occupe toute la largeur plutôt
    // que de laisser deux trous.
    const lastIsAlone = images.length % 3 === 1

    return (
      <>
        <div className="vb-grid vb-grid--3col">
          {images.map((src, i) => (
            <div
              key={i}
              className={`vb-cell${i === images.length - 1 && lastIsAlone ? ' vb-cell--full' : ''}`}
            >
              <ImgBlock src={src} grad={GRAD[i % GRAD.length]} onClick={() => openLb(i)} />
            </div>
          ))}
        </div>
        {lightbox}
      </>
    )
  }

  return null
}
