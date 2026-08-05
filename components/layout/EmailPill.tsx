'use client'

import { useEffect, useRef, useState } from 'react'
import Magnetic from '@/components/motion/Magnetic'

const EMAIL = 'bsy.alexis@gmail.com'

/**
 * Pilule e-mail flottante, présente sur tout le site.
 *
 * Pendant discret de la pilule « Menu » du nav : même surface noire, même
 * rayon, même attraction magnétique. Un clic copie l'adresse, le contact
 * reste à portée de main sans avoir à retrouver le footer.
 */
export default function EmailPill() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      // Contexte non sécurisé ou permission refusée : copie via une zone de
      // texte éphémère, seul chemin restant sans API Clipboard.
      const ta = document.createElement('textarea')
      ta.value = EMAIL
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mailpill">
      <Magnetic strength={0.2}>
        <button
          type="button"
          className={`mailpill__btn${copied ? ' is-copied' : ''}`}
          onClick={copy}
          aria-label={`Copier l'adresse ${EMAIL}`}
        >
          {/* Les deux libellés occupent la même cellule : l'échange se fait
              par fondu, sans que la pilule change de largeur. */}
          <span className="mailpill__labels">
            <span className="mailpill__mail">{EMAIL}</span>
            <span className="mailpill__done" aria-hidden="true">Copié !</span>
          </span>
          <span className="mailpill__icons" aria-hidden="true">
            <svg className="mailpill__ic-copy" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2.5" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <svg className="mailpill__ic-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
        </button>
      </Magnetic>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Adresse e-mail copiée' : ''}
      </span>
    </div>
  )
}
