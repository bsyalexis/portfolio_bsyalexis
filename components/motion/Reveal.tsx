'use client'

import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Balise rendue. Par défaut une div. */
  as?: ElementType
  /** Découpe le texte en mots masqués qui remontent un par un.
      Impose que `children` soit une chaîne. */
  split?: boolean
  /** Retard avant le départ, en secondes. */
  delay?: number
  /** Intervalle entre deux mots en mode split, en secondes. */
  stagger?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * Révélation à l'entrée dans le champ.
 *
 * Deux principes :
 *
 * 1. Le texte est découpé au rendu, donc côté serveur : les mots sont dans le
 *    HTML livré et restent lisibles par les moteurs de recherche et les
 *    lecteurs d'écran (le conteneur porte le texte complet, les fragments
 *    sont masqués à l'accessibilité).
 *
 * 2. L'état caché est posé par la classe `js` sur <html> (voir layout.tsx),
 *    jamais par le composant. Sans JavaScript, rien ne se cache : la page
 *    reste entièrement lisible au lieu de rester blanche.
 *
 * L'animation elle-même est une transition CSS déclenchée par un
 * IntersectionObserver. Pas de boucle rAF : c'est plus économe, et ça ne se
 * fige pas quand l'onglet est en arrière-plan.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  split = false,
  delay = 0,
  stagger = 0.045,
  className = '',
  style,
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in')
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.classList.add('is-in')
        io.disconnect() // une seule fois : rejouer au retour donne le tournis
      },
      // 18% du bloc visible : assez pour que la révélation se voie, pas assez
      // pour qu'elle se déclenche hors champ sur les blocs très hauts.
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  if (split) {
    if (typeof children !== 'string') {
      throw new Error('Reveal: le mode split attend une chaîne de caractères.')
    }
    const words = children.split(' ')

    return (
      <Tag
        ref={ref}
        className={`reveal reveal--split ${className}`}
        style={{ ...style, ['--reveal-delay' as string]: `${delay}s` }}
      >
        {/* Le texte complet pour les lecteurs d'écran : sans ça, chaque mot
            est annoncé comme un fragment séparé. */}
        <span className="sr-only">{children}</span>
        <span aria-hidden="true">
          {words.map((word, i) => (
            // L'espace est un nœud frère du masque, jamais son enfant : à
            // l'intérieur d'un inline-block en overflow hidden il est réduit à
            // néant et tous les mots se collent les uns aux autres.
            <span className="reveal__unit" key={`${word}-${i}`}>
              <span className="reveal__mask">
                <span
                  className="reveal__word"
                  style={{ ['--i' as string]: i, ['--stagger' as string]: `${stagger}s` }}
                >
                  {word}
                </span>
              </span>
              {i < words.length - 1 ? ' ' : null}
            </span>
          ))}
        </span>
      </Tag>
    )
  }

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ ...style, ['--reveal-delay' as string]: `${delay}s` }}
    >
      {children}
    </Tag>
  )
}
