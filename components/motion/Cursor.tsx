'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Curseur contextuel.
 *
 * Suit la souris avec un léger retard et change d'état au survol des éléments
 * portant `data-cursor` : la valeur de l'attribut devient le libellé affiché
 * ("VOIR", "LIRE"…). C'est ce qui remplace le survol muet des vignettes.
 *
 * Strictement desktop : monté seulement si le pointeur est précis. Sur mobile
 * il n'y a pas de curseur à augmenter, et le faire tourner quand même coûte
 * une boucle rAF permanente pour rien.
 */
export default function Cursor() {
  const dotRef   = useRef<HTMLDivElement>(null)
  const [label, setLabel]     = useState('')
  const [active, setActive]   = useState(false)
  const [visible, setVisible] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(fine && !calm)
  }, [])

  useEffect(() => {
    if (!enabled) return

    // Position visée (la souris) et position rendue (le curseur), distinctes :
    // c'est l'écart entre les deux, rattrapé à chaque frame, qui donne
    // l'inertie. Les deux confondues, le curseur redevient un pointeur sec.
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let cx = tx
    let cy = ty
    let raf = 0

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      setVisible(true)

      const hit = (e.target as Element | null)?.closest?.('[data-cursor]')
      if (hit) {
        setLabel(hit.getAttribute('data-cursor') || '')
        setActive(true)
      } else {
        setActive(false)
      }
    }

    const onLeave = () => setVisible(false)

    const loop = () => {
      cx += (tx - cx) * 0.18
      cy += (ty - cy) * 0.18
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(loop)

    document.documentElement.classList.add('has-cursor')
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={dotRef}
      className={`cursor${active ? ' is-active' : ''}${visible ? ' is-visible' : ''}`}
      aria-hidden="true"
    >
      <span className="cursor__label">{label}</span>
    </div>
  )
}
