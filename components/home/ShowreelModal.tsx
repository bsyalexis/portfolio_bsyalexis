'use client'

import { useEffect, useRef } from 'react'

interface Props {
  videoId: string
  onClose: () => void
}

/**
 * Lecteur showreel plein écran.
 *
 * Volontairement monté à la demande : l'iframe YouTube ne part qu'au clic.
 * En fond de hero elle coûtait ~1 Mo et un LCP dégradé à chaque visite, pour
 * une vidéo que personne ne regardait vraiment (muette, rognée, sans son).
 */
export default function ShowreelModal({ videoId, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div
      className="reel"
      role="dialog"
      aria-modal="true"
      aria-label="Showreel"
      onClick={onClose}
    >
      <button ref={closeRef} className="reel__close" onClick={onClose} aria-label="Fermer le showreel">
        ✕
      </button>

      {/* stopPropagation : cliquer la vidéo (pause, volume) ne ferme pas la modale */}
      <div className="reel__frame" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title="Showreel — Alexis Bossy"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
