'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** Amplitude de l'attraction : 0.4 ≈ le bouton parcourt 40% de l'écart. */
  strength?: number
  className?: string
}

/**
 * Attire son contenu vers le curseur au survol.
 *
 * Réservé aux petites cibles isolées (boutons, flèches). Appliqué à un bloc
 * de texte ou à une carte, l'effet devient une gêne : on vise un élément qui
 * se dérobe.
 */
export default function Magnetic({ children, strength = 0.35, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let tx = 0, ty = 0, cx = 0, cy = 0

    const loop = () => {
      cx += (tx - cx) * 0.16
      cy += (ty - cy) * 0.16
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      // On coupe la boucle une fois immobile : la garder ouverte ferait
      // tourner un rAF par bouton magnétique, en permanence, pour rien.
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        raf = requestAnimationFrame(loop)
      } else {
        raf = 0
      }
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop) }

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      tx = (e.clientX - (r.left + r.width / 2)) * strength
      ty = (e.clientY - (r.top + r.height / 2)) * strength
      kick()
    }
    const onLeave = () => { tx = 0; ty = 0; kick() }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [strength])

  return (
    <span ref={ref} className={`magnetic ${className}`}>
      {children}
    </span>
  )
}
