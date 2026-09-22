'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Props {
  cover?: string
  video?: string
  /** Attribut `sizes` transmis à l'image. */
  sizes: string
  /** Classe posée sur le média rendu, image comme vidéo. */
  className?: string
}

/**
 * Couverture d'une carte projet : boucle vidéo sur grand écran, image fixe
 * partout ailleurs.
 *
 * Les boucles de couverture pèsent jusqu'à 1,2 Mo et se décodent en continu.
 * Sur un téléphone en 4G c'était la moitié du poids de la page d'accueil pour
 * une vignette de 340px de large, en plus du décodage qui tient le CPU
 * pendant tout le défilement. Même arbitrage que le hero : petit écran,
 * mouvement réduit ou économiseur de données annoncé, on sert le poster.
 */
export default function CoverMedia({ cover, video, sizes, className }: Props) {
  const [playVideo, setPlayVideo] = useState(false)

  useEffect(() => {
    if (!video) return

    const wideQ = window.matchMedia('(min-width: 768px)')
    const calmQ = window.matchMedia('(prefers-reduced-motion: reduce)')

    const decide = () => {
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      setPlayVideo(wideQ.matches && !calmQ.matches && !conn?.saveData)
    }

    decide()
    wideQ.addEventListener('change', decide)
    calmQ.addEventListener('change', decide)
    return () => {
      wideQ.removeEventListener('change', decide)
      calmQ.removeEventListener('change', decide)
    }
  }, [video])

  if (video && playVideo) {
    return (
      <video
        autoPlay muted loop playsInline preload="metadata" aria-hidden="true"
        className={className}
        poster={cover}
      >
        {/* type déduit de l'extension : la grille mélange .webm et .mp4
            selon la source disponible. */}
        <source src={video} type={video.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
      </video>
    )
  }

  if (!cover) return null

  return <Image src={cover} alt="" fill sizes={sizes} quality={72} className={className} />
}
