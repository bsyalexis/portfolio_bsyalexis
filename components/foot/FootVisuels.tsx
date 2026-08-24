'use client'

import { useState, useCallback } from 'react'
import Lightbox from '@/components/projet/Lightbox'

export interface VisuelFoot {
  image: string
  ratio: number
}

/**
 * Les visuels réseaux, présentés comme des objets et non comme des photos :
 * cadre, ombre portée, aucun rognage. Un visuel rogné ne veut plus rien dire,
 * c'est une mise en page avec du texte dedans.
 */
export default function FootVisuels({ visuels }: { visuels: VisuelFoot[] }) {
  const [lbIndex, setLbIndex] = useState<number | null>(null)

  const images = visuels.map((v) => v.image)

  const close = useCallback(() => setLbIndex(null), [])
  const prev  = useCallback(
    () => setLbIndex((i) => (i !== null ? (i - 1 + visuels.length) % visuels.length : null)),
    [visuels.length],
  )
  const next  = useCallback(
    () => setLbIndex((i) => (i !== null ? (i + 1) % visuels.length : null)),
    [visuels.length],
  )

  return (
    <>
      <div className="fg-visuels">
        {visuels.map((visuel, i) => (
          <button
            key={visuel.image}
            className="fg-visuel"
            onClick={() => setLbIndex(i)}
            style={{ ['--ar' as string]: String(visuel.ratio) }}
            aria-label={`Agrandir le visuel ${i + 1}`}
          >
            <img src={visuel.image} alt="Visuel réseaux sociaux pour un club de football" loading="lazy" decoding="async" />
          </button>
        ))}
      </div>

      {lbIndex !== null && (
        <Lightbox images={images} index={lbIndex} onClose={close} onPrev={prev} onNext={next} />
      )}
    </>
  )
}
