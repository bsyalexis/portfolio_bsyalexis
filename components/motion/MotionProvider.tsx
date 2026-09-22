'use client'

import { MotionConfig } from 'motion/react'

/* Mouvement réduit : Motion retire les déplacements et garde les fondus,
   pour tous les composants Motion du site d'un coup. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
