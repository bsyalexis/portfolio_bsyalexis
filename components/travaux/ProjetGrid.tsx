'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ProjetCard from './ProjetCard'

interface Projet {
  slug: string
  title: string
  client: string
  category: string
  year: string
  ratio?: string
  cover?: string
}

interface Props {
  projets: Projet[]
}

export default function ProjetGrid({ projets }: Props) {
  const gridRef   = useRef<HTMLDivElement>(null)
  const isFirst   = useRef(true)

  useEffect(() => {
    if (!gridRef.current) return

    const cards = gridRef.current.querySelectorAll<HTMLElement>('.projet-card')

    if (isFirst.current) {
      // Entrée initiale — légèrement différée
      gsap.from(cards, {
        opacity: 0,
        y: 24,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power2.out',
        delay: 0.2,
      })
      isFirst.current = false
    } else {
      // Transition filtre — out → in rapide
      gsap.fromTo(
        cards,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out' }
      )
    }
  }, [projets])

  return (
    <div
      ref={gridRef}
      className="travaux-grid"
      style={{
        maxWidth:      '1200px',
        margin:        '0 auto',
        paddingInline: '56px',
        paddingBottom: '96px',
      }}
    >
      {projets.map((p) => (
        <ProjetCard key={p.slug} projet={p} />
      ))}
    </div>
  )
}
