'use client'

import React, { useState, useCallback } from 'react'
import Lightbox from './Lightbox'

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

/* Une rangée : combien de colonnes, quels indices, et la forme du bloc.
   `aspect` est le ratio du conteneur, pas d'une image : c'est lui qui fixe la
   hauteur en CSS, donc la rangée reste proportionnelle à toutes les largeurs
   d'écran là où une hauteur en pixels ne l'était pas. */
interface Row { cols: number; idx: number[]; aspect: number }

/* Nombre d'images par rangée, alterné pour éviter une grille monotone.
   Les portraits passent par 3 et 4 : au-delà, la vignette devient timbre-poste ;
   en dessous de 3, la rangée est plus haute que large. */
const CYCLE_PORTRAIT = [3, 4, 3]
const CYCLE_PAYSAGE  = [2, 3]

const estPortrait = (a: number) => a < 1

/* Plancher de ratio : en deçà, la rangée devient plus haute que deux écrans.
   Ne mord que sur les cas dégénérés (une seule image d'une orientation). */
const RATIO_MIN = 1.6

/** Découpe un ensemble d'indices en rangées, sans jamais laisser de reliquat
 *  isolé : une image seule sur sa ligne occuperait toute la largeur et se
 *  déroulerait sur plus de 2000 px de haut. Le reste est absorbé par la
 *  dernière rangée. */
function decouper(pool: number[], cycle: number[], mini: number): number[][] {
  const out: number[][] = []
  let i = 0
  let c = 0
  while (i < pool.length) {
    const reste = pool.length - i
    let n = Math.min(cycle[c++ % cycle.length], reste)
    if (reste - n > 0 && reste - n < mini) n = reste
    out.push(pool.slice(i, i + n))
    i += n
  }
  return out
}

/**
 * Découpe les images en rangées homogènes en orientation.
 *
 * Les cellules d'une même ligne partagent leur hauteur : y mélanger portrait
 * et paysage force forcément le rognage de l'un des deux. On sépare donc les
 * deux orientations en amont (et non au fil de la liste, sinon l'alternance
 * issue du dé-groupage produit des séries d'une seule image), puis on
 * répartit les rangées paysage parmi les portraits pour garder du rythme.
 * La hauteur de chaque rangée se déduit du ratio moyen de son contenu : c'est
 * ce qui rend les photos visibles en entier plutôt qu'en bande recadrée.
 */
function buildRows(aspects: number[], decalage: number): Row[] {
  const portraits: number[] = []
  const paysages:  number[] = []
  aspects.forEach((a, i) => (estPortrait(a) ? portraits : paysages).push(i))

  const rp = decouper(portraits, CYCLE_PORTRAIT, 3)
  const rl = decouper(paysages,  CYCLE_PAYSAGE,  2)

  const ordre: number[][] = []
  const pas = rl.length ? Math.max(1, Math.round(rp.length / (rl.length + 1))) : Infinity
  let li = 0
  rp.forEach((r, i) => {
    ordre.push(r)
    if (li < rl.length && (i + 1) % pas === 0) ordre.push(rl[li++])
  })
  while (li < rl.length) ordre.push(rl[li++])

  return ordre.map((idxs) => {
    const moyen = idxs.reduce((s, i) => s + aspects[i], 0) / idxs.length
    // Chaque cellule fait 1/n de la largeur ; sa hauteur vaut cette largeur
    // divisée par le ratio de l'image, d'où le ratio du conteneur.
    return {
      cols:   idxs.length,
      idx:    idxs.map((i) => decalage + i),
      aspect: Math.max(RATIO_MIN, idxs.length * moyen),
    }
  })
}

export default function PhotoGallery({
  title, client, year, category, galleryText = '', galleryImages = [],
  galleryAspects = [],
}: Props) {
  const [lbIndex, setLbIndex] = useState<number | null>(null)

  const openLb = useCallback((i: number) => setLbIndex(i), [])
  const closeLb = useCallback(() => setLbIndex(null), [])
  const prevLb = useCallback(() => setLbIndex((i) => i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null), [galleryImages.length])
  const nextLb = useCallback(() => setLbIndex((i) => i !== null ? (i + 1) % galleryImages.length : null), [galleryImages.length])

  const cell = (globalIdx: number, style: React.CSSProperties) => (
    <div
      key={globalIdx}
      className="gallery-clickable"
      onClick={() => openLb(globalIdx)}
      style={{
        ...style,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        background: galleryImages[globalIdx] ? undefined : placeholders[globalIdx % placeholders.length],
      }}
    >
      {galleryImages[globalIdx] && (
        <img
          src={galleryImages[globalIdx]}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
    </div>
  )

  /* Sans ratios fournis on retombe sur du 3:2 : le rendu vaut alors l'ancien,
     plutôt que de casser une galerie dont les mesures manqueraient. */
  const aspects = galleryImages.map((_, i) => galleryAspects[i] ?? 1.5)

  // La première image occupe la rangée d'en-tête, aux côtés du bloc de texte.
  const heroImg    = galleryImages[0]
  const heroAspect = aspects[0] ?? 1.5
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
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '3px',
          width: '100%',
          aspectRatio: String(heroRowAspect),
          /* Plancher pour que le bloc de texte respire, mais indexé sur la
             largeur : une valeur fixe en pixels écrasait le ratio sur écran
             étroit et remettait à rogner l'image qu'on cherche à montrer. */
          minHeight: 'min(440px, 60vw)',
          maxHeight: '880px',
        }}
      >
        <div style={{ ...styles.textCard, gridColumn: heroPortrait ? '1 / 3' : '1' }}>
          <div style={styles.accentLine} />
          <div style={styles.textTop}>
            <span style={styles.pill}>{categoryLabel[category] ?? category}&ensp;·&ensp;{year}</span>
            <h2 style={styles.title}>{title}</h2>
            {galleryText && <p style={styles.body}>{galleryText}</p>}
          </div>
          <p style={styles.clientLabel}>{client}</p>
        </div>
        <div
          className="gallery-clickable"
          onClick={() => openLb(0)}
          style={{
            gridColumn: heroPortrait ? '3' : '2 / 4',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            background: heroImg ? undefined : placeholders[0],
          }}
        >
          {heroImg && (
            <img src={heroImg} alt="" loading="lazy" decoding="async"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
        </div>
      </div>

      {/* ── Rangées suivantes, une hauteur par orientation ── */}
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${row.cols}, 1fr)`,
            gap: '3px',
            width: '100%',
            aspectRatio: String(row.aspect),
            marginTop: '3px',
          }}
        >
          {row.idx.map((gi) => cell(gi, { height: '100%' }))}
        </div>
      ))}

      {lbIndex !== null && galleryImages.length > 0 && (
        <Lightbox images={galleryImages} index={lbIndex} onClose={closeLb} onPrev={prevLb} onNext={nextLb} />
      )}
    </>
  )
}

const styles: Record<string, React.CSSProperties> = {
  textCard: {
    gridColumn:     '1',
    gridRow:        '1',
    background:     'var(--bg)',
    padding:        '52px 48px',
    display:        'flex',
    flexDirection:  'column',
    justifyContent: 'space-between',
    position:       'relative',
    overflow:       'hidden',
    height:         '100%',
  },
  accentLine: {
    position:   'absolute',
    top:        0,
    left:       0,
    right:      0,
    height:     '3px',
    background: 'var(--accent)',
  },
  textTop: {
    display:       'flex',
    flexDirection: 'column',
    gap:           '20px',
  },
  pill: {
    display:       'inline-block',
    fontSize:      '0.65rem',
    fontWeight:    600,
    letterSpacing: '0.12em',
    color:         'var(--accent)',
    textTransform: 'uppercase',
  },
  title: {
    fontSize:      'clamp(2rem, 3vw, 3rem)',
    fontWeight:    300,
    letterSpacing: '-0.025em',
    lineHeight:    1.1,
    color:         'var(--text)',
    margin:        0,
  },
  body: {
    fontSize:   '0.92rem',
    fontWeight: 300,
    lineHeight: 1.8,
    color:      'var(--text-mid)',
    margin:     0,
    maxWidth:   '340px',
  },
  clientLabel: {
    fontSize:      '0.72rem',
    fontWeight:    500,
    letterSpacing: '0.08em',
    color:         'var(--text-dim)',
    margin:        0,
    textTransform: 'uppercase',
  },
}
