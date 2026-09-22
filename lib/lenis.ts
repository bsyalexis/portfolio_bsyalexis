import type Lenis from 'lenis'

/* Référence unique à l'instance de défilement fluide.
 *
 * Le verrou de défilement (voir scroll-lock.ts) doit pouvoir mettre Lenis en
 * pause : sans ça, sa boucle réécrit la position à chaque frame et se bat
 * avec le `position: fixed` posé sur le body pendant qu'un panneau est
 * ouvert. Passer l'instance par un contexte React obligerait tous les
 * appelants à être des composants ; le verrou, lui, est appelé depuis un
 * effet. D'où ce singleton de module. */
let instance: Lenis | null = null

export function setLenis(l: Lenis | null) { instance = l }
export function getLenis() { return instance }
