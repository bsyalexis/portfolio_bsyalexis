'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

const LINKS = [
  { href: '/',         label: 'Accueil', num: '01' },
  { href: '/travaux',  label: 'Travaux', num: '02' },
  { href: '/#contact', label: 'Contact', num: '03' },
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
 * Menu plein écran.
 *
 * Remplace le panneau mobile d'avant et sert désormais à toutes les tailles :
 * c'est le seul endroit du site où la navigation devient un moment à part
 * entière plutôt qu'une barre qu'on subit.
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
      // page derrière, que l'utilisateur ne voit pas.
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (!focusables?.length) return
      const first = focusables[0]
      const last  = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  return (
    <div
      ref={panelRef}
      className={`menu${open ? ' is-open' : ''}`}
      // inert n'est pas encore typé partout ; aria-hidden + le retrait du
      // focus suffisent à sortir le menu fermé de l'ordre de tabulation.
      aria-hidden={!open}
      role="dialog"
      aria-modal={open}
      aria-label="Menu principal"
    >
      <div className="menu__bg" />

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
            data-cursor="ALLER"
          >
            <span className="menu__num">{l.num}</span>
            <span className="menu__mask">
              <span className="menu__word">{l.label}</span>
            </span>
          </Link>
        ))}
      </nav>

      <div className="menu__foot">
        <div className="menu__col">
          <span className="menu__label">Écrire</span>
          <a href="mailto:bsy.alexis@gmail.com" tabIndex={open ? 0 : -1} className="menu__mail">
            bsy.alexis@gmail.com
          </a>
        </div>
        <div className="menu__col">
          <span className="menu__label">Suivre</span>
          <div className="menu__socials">
            {SOCIALS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
