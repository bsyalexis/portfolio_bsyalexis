'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VisualBlock from './VisualBlock'

gsap.registerPlugin(ScrollTrigger)

interface Visual {
  layout: string
  images: string[]
}

interface ChapterData {
  number:          string
  title:           string
  text:            string
  darkBackground?: boolean
  visuals?:        Visual[]
}

interface Props {
  chapter: ChapterData
}

export default function Chapter({ chapter }: Props) {
  const ref  = useRef<HTMLElement>(null)
  const dark = chapter.darkBackground ?? false

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.chapter-entry', {
        opacity:       0,
        y:             28,
        duration:      0.75,
        stagger:       0.1,
        ease:          'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  /* Couleurs selon le mode */
  const c = {
    heading: dark ? '#ffffff'                : 'var(--text)',
    text:    dark ? 'rgba(255,255,255,0.65)' : 'var(--text-mid)',
  }

  return (
    <section
      ref={ref}
      className="chapter"
      style={{ background: dark ? '#111010' : 'var(--bg)' }}
    >
      {/* ── En-tête du chapitre ─────────────────── */}
      <div className="chapter__head">
        <div
          className="chapter-inner-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: '160px 1fr',
            gap:                 '56px',
            alignItems:          'start',
          }}
        >
          {/* Colonne gauche : numéro + trait cerise */}
          <div className="chapter-entry chapter__num">
            <span className="chapter__num-label">{chapter.number}</span>
            <span className="chapter__num-rule" aria-hidden="true" />
          </div>

          {/* Colonne droite : titre, texte, méta */}
          <div>
            <h2
              className="chapter-entry"
              style={{
                fontSize:      'clamp(1.7rem, 2.6vw, 2.5rem)',
                fontWeight:    300,
                letterSpacing: '-0.025em',
                lineHeight:    1.15,
                color:         c.heading,
                margin:        0,
                marginBottom:  '22px',
              }}
            >
              {chapter.title}
            </h2>

            {chapter.text.split('\n').filter(Boolean).map((para, i) => (
              <p
                key={i}
                className="chapter-entry"
                style={{
                  fontSize:     '1rem',
                  fontWeight:   300,
                  lineHeight:   1.85,
                  color:        c.text,
                  maxWidth:     '600px',
                  margin:       0,
                  marginTop:    i > 0 ? '1.2em' : 0,
                }}
              >
                {para}
              </p>
            ))}

          </div>
        </div>
      </div>

      {/* ── Visuels ────────────────────────────── */}
      {chapter.visuals && chapter.visuals.length > 0 && (
        <div className="chapter__visuals">
          {chapter.visuals.map((visual, i) => (
            <VisualBlock key={i} visual={visual} dark={dark} />
          ))}
        </div>
      )}
    </section>
  )
}
