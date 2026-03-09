'use client'

import { useEffect, useCallback } from 'react'

interface Props {
  images: string[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({ images, index, onClose, onPrev, onNext }: Props) {
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
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      {/* Counter */}
      <span className="lightbox-counter">
        {index + 1} / {images.length}
      </span>

      {/* Close */}
      <button className="lightbox-close" onClick={onClose} aria-label="Fermer">
        &times;
      </button>

      {/* Prev */}
      <button
        className="lightbox-arrow lightbox-arrow-left"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Précédent"
      >
        &#8249;
      </button>

      {/* Image */}
      <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[index]}
          alt=""
          className="lightbox-img"
          draggable={false}
        />
      </div>

      {/* Next */}
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
