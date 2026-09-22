'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'
import { buildRows, estPortrait } from '@/lib/gallery-rows'

interface Props {
  title:         string
  client:        string
  year:          string
  category:      string
  galleryText?:  string
  galleryImages?: string[]
  /* Ratio largeur/hauteur de chaque image, dans l'ordre de galleryImages.
     Calculé à la source (scripts) plutôt que mesuré au chargement : la grille
     doit connaître la forme des images avant de poser ses rangées, sinon la
     page saute une fois les images arrivées. */
  galleryAspects?: number[]
}

const placeholders = [
  'linear-gradient(155deg, #d8d3cc 0%, #b0a9a2 100%)',
  'linear-gradient(155deg, #cfc9c1 0%, #a8a19a 100%)',
  'linear-gradient(155deg, #c6bfb7 0%, #a09890 100%)',
  'linear-gradient(155deg, #bdb6ae 0%, #979088 100%)',
  'linear-gradient(155deg, #b4ada5 0%, #8e8880 100%)',
  'linear-gradient(155deg, #aaa39b 0%, #857f78 100%)',
  'linear-gradient(155deg, #a09991 0%, #7c7670 100%)',
  'linear-gradient(155deg, #979089 0%, #736d67 100%)',
]

const categoryLabel: Record<string, string> = {
  photo:  'Photographie',
  video:  'Vidéo',
  autres: 'Direction Artistique',
}

/* Largeurs de rendu. En dessous de 768px la grille repasse à deux colonnes
   quelles que soient les rangées calculées pour le bureau, d'où le 50vw. */
const CELL_SIZES = '(max-width: 767px) 50vw, (max-width: 1400px) 33vw, 460px'
const HERO_SIZES = '(max-width: 767px) 100vw, 66vw'

export default function PhotoGallery({
  title, client, year, category, galleryText = '', galleryImages = [],
  galleryAspects = [],
}: Props) {
  const [lbIndex, setLbIndex] = useState<number | null>(null)

  const openLb  = useCallback((i: number) => setLbIndex(i), [])
  const closeLb = useCallback(() => setLbIndex(null), [])
  const prevLb  = useCallback(() => setLbIndex((i) => i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null), [galleryImages.length])
  const nextLb  = useCallback(() => setLbIndex((i) => i !== null ? (i + 1) % galleryImages.length : null), [galleryImages.length])

  /* Sans ratios fournis on retombe sur du 3:2 : le rendu vaut alors l'ancien,
     plutôt que de casser une galerie dont les mesures manqueraient. */
  const aspects = galleryImages.map((_, i) => galleryAspects[i] ?? 1.5)

  /* Une cellule cliquable. C'est un bouton et non une div : ouvrir la
     visionneuse doit être atteignable au clavier et annoncé comme une
     action, ce qu'une div avec onClick n'est ni l'un ni l'autre. */
  const cell = (gi: number, extraClass = '', sizes = CELL_SIZES) => (
    <button
      key={gi}
      type="button"
      className={`pgal__cell${extraClass ? ' ' + extraClass : ''}`}
      onClick={() => openLb(gi)}
      aria-label={`Agrandir la photo ${gi + 1} sur ${galleryImages.length}`}
      style={{
        ['--cell-ar' as string]: String(aspects[gi] ?? 1.5),
        background: galleryImages[gi] ? undefined : placeholders[gi % placeholders.length],
      }}
    >
      {galleryImages[gi] && (
        <Image src={galleryImages[gi]} alt="" fill sizes={sizes} quality={74} />
      )}
    </button>
  )

  // La première image occupe la rangée d'en-tête, aux côtés du bloc de texte.
  const heroAspect   = aspects[0] ?? 1.5
  const heroPortrait = estPortrait(heroAspect)

  /* Un portrait mis sur deux colonnes ne montrerait qu'une bande de l'image :
     on inverse alors les proportions, le texte prend la largeur et la photo
     garde sa colonne étroite. */
  const heroRowAspect = heroPortrait ? 3 * heroAspect : 1.5 * heroAspect

  const rows = buildRows(aspects.slice(1), 1)

  return (
    <>
      {/* ── Rangée d'en-tête : bloc de texte + première image ── */}
      <div
        className="pgal__head"
        data-portrait={heroPortrait ? 'true' : 'false'}
        style={{ ['--ar' as string]: String(heroRowAspect) }}
      >
        <div className="pgal__card">
          <div className="pgal__accent" />
          <div className="pgal__card-top">
            <span className="pgal__pill">{categoryLabel[category] ?? category}&ensp;·&ensp;{year}</span>
            <h2 className="pgal__title">{title}</h2>
            {galleryText && <p className="pgal__body">{galleryText}</p>}
          </div>
          <p className="pgal__client">{client}</p>
        </div>
        {cell(0, 'pgal__cell--hero', HERO_SIZES)}
      </div>

      {/* ── Rangées suivantes, une hauteur par orientation ──
          En dessous de 768px les rangées s'effacent (`display: contents`) et
          rendent leurs cellules à une grille de deux colonnes : à 375px, une
          rangée de quatre portraits donnait des vignettes de 90px. */}
      <div className="pgal__rows">
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="pgal__row"
            style={{
              ['--cols' as string]: String(row.cols),
              ['--ar' as string]:   String(row.aspect),
            }}
          >
            {row.idx.map((gi) => cell(gi))}
          </div>
        ))}
      </div>

      {lbIndex !== null && galleryImages.length > 0 && (
        <Lightbox images={galleryImages} index={lbIndex} onClose={closeLb} onPrev={prevLb} onNext={nextLb} />
      )}
    </>
  )
}
