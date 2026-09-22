'use client'

import { useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { lockScroll, unlockScroll } from '@/lib/scroll-lock'

interface Props {
  images: string[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

/* Au-delà de cette distance horizontale, le geste est un balayage et non une
   tape. En dessous, un doigt qui tremble fermerait ou changerait d'image. */
const SWIPE_PX = 48

export default function Lightbox({ images, index, onClose, onPrev, onNext }: Props) {
  const start = useRef<{ x: number; y: number } | null>(null)

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    },
    [onClose, onPrev, onNext],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    lockScroll()
    return () => {
      document.removeEventListener('keydown', handleKey)
      unlockScroll()
    }
  }, [handleKey])

  /* Balayage tactile. Sur mobile les flèches font 36px dans les coins : elles
     restent là pour qui les cherche, mais le geste attendu sur une galerie
     plein écran est le glissement latéral. */
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    start.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = start.current
    start.current = null
    if (!s) return
    const t = e.changedTouches[0]
    const dx = t.clientX - s.x
    const dy = t.clientY - s.y
    // Un glissement plus vertical qu'horizontal n'est pas un changement
    // d'image : c'est un début de défilement, on l'ignore.
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy)) return
    if (dx > 0) onPrev()
    else onNext()
  }

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Visionneuse"
    >
      <span className="lightbox-counter">
        {index + 1} / {images.length}
      </span>

      <button className="lightbox-close" onClick={onClose} aria-label="Fermer">
        &times;
      </button>

      <button
        className="lightbox-arrow lightbox-arrow-left"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Précédent"
      >
        &#8249;
      </button>

      <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
        {/* `fill` plutôt que des dimensions : les visuels d'un même projet
            mélangent portrait et paysage, seule la boîte est connue. */}
        <Image
          key={images[index]}
          src={images[index]}
          alt=""
          fill
          sizes="100vw"
          quality={82}
          priority
          className="lightbox-img"
          draggable={false}
        />
      </div>

      <button
        className="lightbox-arrow lightbox-arrow-right"
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Suivant"
      >
        &#8250;
      </button>
    </div>
  )
}
