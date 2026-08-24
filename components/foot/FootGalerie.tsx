'use client'

import React, { useState, useCallback } from 'react'
import Lightbox from '@/components/projet/Lightbox'
import { buildRows } from '@/lib/gallery-rows'

export interface PhotoFoot {
  /** Version calibrée pour la grille, générée par scripts/build-galerie-foot.mjs. */
  vignette: string
  /** Fichier d'origine, servi seulement en plein écran. */
  pleine:   string
  ratio:    number
  club:     string
  projet:   string
}

/**
 * La galerie foot complète : toutes les photos des reportages football,
 * mélangées entre clubs.
 *
 * L'ordre vient du manifeste, pas du rendu : voir le script de génération.
 * La grille réutilise le découpage en rangées des pages projet, pour que les
 * deux surfaces ne finissent pas par se ressembler de loin seulement.
 */
export default function FootGalerie({ photos }: { photos: PhotoFoot[] }) {
  const [lbIndex, setLbIndex] = useState<number | null>(null)

  const pleines = photos.map((p) => p.pleine)

  const openLb  = useCallback((i: number) => setLbIndex(i), [])
  const closeLb = useCallback(() => setLbIndex(null), [])
  const prevLb  = useCallback(
    () => setLbIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)),
    [photos.length],
  )
  const nextLb  = useCallback(
    () => setLbIndex((i) => (i !== null ? (i + 1) % photos.length : null)),
    [photos.length],
  )

  const rows = buildRows(photos.map((p) => p.ratio), 0)

  return (
    <>
      {/* Le conteneur ne sert qu'au repli mobile : les rangées y passent en
          `display: contents` et leurs cellules retombent dans une grille à deux
          colonnes. À quatre par ligne sur un téléphone, une photo mesure 95 px
          de large : autant ne rien montrer. */}
      <div className="foot-grid">
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="foot-row"
            style={{
              gridTemplateColumns: `repeat(${row.cols}, 1fr)`,
              aspectRatio:         String(row.aspect),
              marginTop:           rowIdx === 0 ? 0 : '3px',
            }}
          >
            {row.idx.map((i) => {
              const photo = photos[i]
              return (
                <div
                  key={photo.vignette}
                  className="gallery-clickable foot-cell"
                  onClick={() => openLb(i)}
                  /* Le ratio n'est lu qu'en version mobile, où chaque cellule
                     porte sa propre hauteur faute de rangée pour la fixer. */
                  style={{ ['--ar' as string]: String(photo.ratio) }}
                >
                  <img
                    src={photo.vignette}
                    alt={`Photographie de football, ${photo.club}`}
                    /* Les six premières sont au-dessus de la ligne de flottaison
                       sur la plupart des écrans : les différer y ferait un trou
                       gris à l'ouverture, exactement là où la page se juge. */
                    loading={i < 6 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <span className="foot-cell__club">{photo.club}</span>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {lbIndex !== null && (
        <Lightbox images={pleines} index={lbIndex} onClose={closeLb} onPrev={prevLb} onNext={nextLb} />
      )}
    </>
  )
}
