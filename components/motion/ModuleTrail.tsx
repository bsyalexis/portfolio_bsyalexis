'use client'

import { useReducedMotion } from 'motion/react'
import { BorderTrail } from '@/components/motion-primitives/border-trail'

/**
 * Lueur qui fait le tour du cadre d'un module important (contact, grande
 * case de la mosaïque). Le parent doit être positionné et arrondi : la
 * trace hérite de son rayon.
 *
 * Réservée à quelques modules : posée partout, elle ne signale plus rien.
 * Coupée en mouvement réduit, c'est une boucle infinie purement décorative.
 */
export default function ModuleTrail({ size = 90, duration = 7 }: { size?: number; duration?: number }) {
  const calm = useReducedMotion()
  if (calm) return null

  return (
    <div className="module-trail" aria-hidden="true">
      <BorderTrail
        size={size}
        className="bg-white/80"
        style={{ boxShadow: '0 0 40px 18px rgb(255 255 255 / 45%)' }}
        transition={{ repeat: Infinity, duration, ease: 'linear' }}
      />
    </div>
  )
}
