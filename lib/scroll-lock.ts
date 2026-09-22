import { getLenis } from './lenis'

/* Verrou de défilement pour les panneaux modaux (menu, lightbox, showreel).
 *
 * `overflow: hidden` sur le body ne suffit pas : sur iOS Safari la page
 * continue de défiler sous l'overlay, et au retour on ne retrouve pas sa
 * place. Le seul chemin fiable est de figer le body en `position: fixed`
 * décalé de la position courante, puis de la restaurer à la fermeture. */

let depth = 0
let savedY = 0
let saved: Record<string, string> = {}

const PROPS = ['position', 'top', 'left', 'right', 'width', 'overflow'] as const

export function lockScroll() {
  // Compteur : deux panneaux superposés (menu puis lightbox) ne doivent pas
  // déverrouiller à la fermeture du premier.
  if (depth++ > 0) return

  getLenis()?.stop()

  savedY = window.scrollY
  const s = document.body.style
  saved = Object.fromEntries(PROPS.map((p) => [p, s.getPropertyValue(p)]))

  s.position = 'fixed'
  s.top      = `-${savedY}px`
  s.left     = '0'
  s.right    = '0'
  s.width    = '100%'
  s.overflow = 'hidden'
}

export function unlockScroll() {
  if (depth === 0) return
  if (--depth > 0) return

  const s = document.body.style
  PROPS.forEach((p) => {
    if (saved[p]) s.setProperty(p, saved[p])
    else s.removeProperty(p)
  })

  // `position: fixed` a ramené le document en haut : on remet la page où elle
  // était avant l'ouverture, sans animation.
  window.scrollTo(0, savedY)
  getLenis()?.start()
}
