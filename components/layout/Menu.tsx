'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

const LINKS = [
  { href: '/',         label: 'Accueil' },
  { href: '/travaux',  label: 'Travaux' },
  { href: '/#about',   label: 'À propos' },
  { href: '/#contact', label: 'Contact' },
]

const SOCIALS = [
  { href: 'https://www.instagram.com/alexbsy_/', label: 'Instagram' },
  { href: 'https://www.tiktok.com/@bsyalex_',    label: 'TikTok' },
  { href: 'https://www.linkedin.com/in/alexis-bossy-aa3198196/', label: 'LinkedIn' },
]

interface Props {
  open: boolean
  onClose: () => void
}

/**
 * Menu en panneau flottant.
 *
 * Le rideau noir plein écran masquait complètement la page ; ce panneau
 * centré la laisse visible autour de lui, ce qui garde le contexte de
 * navigation. La barre supérieure porte l'action de fermeture.
 */
export default function Menu({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const firstRef = useRef<HTMLAnchorElement>(null)

  /* Verrou de défilement + échappement + piège de focus. */
  useEffect(() => {
    if (!open) return

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return

      // Sans ce piège, la tabulation sort du menu ouvert et va parcourir la
      // page derrière, que l'utilisateur ne peut pas atteindre.
      const f = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (!f?.length) return
      const first = f[0]
      const last  = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  return (
    <div className={`menu${open ? ' is-open' : ''}`} aria-hidden={!open}>
      {/* Voile cliquable. C'est un bouton et non une div : fermer au clic
          extérieur doit aussi être atteignable au clavier et annoncé. */}
      <button
        className="menu__veil"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        aria-label="Fermer le menu"
      />

      <div
        ref={panelRef}
        className="menu__panel"
        role="dialog"
        aria-modal={open}
        aria-label="Menu principal"
      >
        {/* Cette barre reprend au pixel près la géométrie de la pilule du
            nav : c'est elle qui donne l'impression que la pilule s'est
            dépliée, plutôt que de s'effacer au profit d'un autre élément. */}
        <div className="menu__bar">
          <button className="menu__close" onClick={onClose} tabIndex={open ? 0 : -1}>
            <span className="menu__close-icon" aria-hidden="true">✕</span>
            Fermer
          </button>
        </div>

        <div className="menu__body">
          <p className="menu__label">Menu</p>
          <nav className="menu__nav">
            {LINKS.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                ref={i === 0 ? firstRef : undefined}
                tabIndex={open ? 0 : -1}
                onClick={onClose}
                className="menu__link"
                style={{ ['--i' as string]: i }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <hr className="menu__rule" />

          <p className="menu__label">Contact</p>
          <a
            href="mailto:contact@alexbsy.fr"
            tabIndex={open ? 0 : -1}
            className="menu__small"
          >
            contact@alexbsy.fr
          </a>

          <p className="menu__label menu__label--spaced">Réseaux</p>
          <div className="menu__socials">
            {SOCIALS.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="menu__small">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <p className="menu__foot">©{new Date().getFullYear()} Alexis Bossy</p>
      </div>
    </div>
  )
}
