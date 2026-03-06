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

interface ProjetMeta {
  client:   string
  year:     string
  category: string
}

interface Props {
  chapter: ChapterData
  meta?:   ProjetMeta    // uniquement pour le chapitre I
}

const categoryLabels: Record<string, string> = {
  video:  'Vidéo',
  photo:  'Photographie',
  autres: 'Autres',
}

export default function Chapter({ chapter, meta }: Props) {
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
    heading:    dark ? '#ffffff'                    : 'var(--text)',
    text:       dark ? 'rgba(255,255,255,0.65)'     : 'var(--text-mid)',
    border:     dark ? 'rgba(255,255,255,0.1)'      : 'var(--border)',
    metaLabel:  dark ? 'rgba(255,255,255,0.35)'     : 'var(--text-dim)',
    metaValue:  dark ? 'rgba(255,255,255,0.82)'     : 'var(--text)',
  }

  return (
    <section
      ref={ref}
      style={{
        paddingTop:    '96px',
        paddingBottom: '80px',
        background:    dark ? '#111010' : 'var(--bg)',
        overflow:      'hidden',
      }}
    >
      {/* ── En-tête du chapitre ─────────────────── */}
      <div
        style={{
          maxWidth:      '1200px',
          margin:        '0 auto',
          paddingInline: '56px',
          marginBottom:  '56px',
        }}
      >
        <div
          className="chapter-inner-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: '160px 1fr',
            gap:                 '56px',
            alignItems:          'start',
          }}
        >
          {/* Colonne gauche — numéro + trait cerise */}
          <div
            className="chapter-entry chapter-number-col"
            style={{ paddingTop: '6px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span
                style={{
                  fontSize:      '0.68rem',
                  fontWeight:    700,
                  letterSpacing: '0.22em',
                  color:         'var(--accent)',
                  flexShrink:    0,
                }}
              >
                {chapter.number}
              </span>
              <div
                style={{
                  flex:       1,
                  height:     '1px',
                  background: 'var(--accent)',
                  opacity:    0.45,
                }}
              />
            </div>
          </div>

          {/* Colonne droite — titre, texte, méta */}
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

            <p
              className="chapter-entry"
              style={{
                fontSize:   '1rem',
                fontWeight: 300,
                lineHeight: 1.85,
                color:      c.text,
                maxWidth:   '600px',
                margin:     0,
              }}
            >
              {chapter.text}
            </p>

            {/* Metadata — chapitre I uniquement */}
            {meta && (
              <div
                className="chapter-entry"
                style={{
                  display:    'flex',
                  gap:        '40px',
                  marginTop:  '40px',
                  paddingTop: '32px',
                  borderTop:  `1px solid ${c.border}`,
                  flexWrap:   'wrap',
                }}
              >
                {[
                  { label: 'Client', value: meta.client },
                  { label: 'Année',  value: meta.year   },
                  { label: 'Type',   value: categoryLabels[meta.category] ?? meta.category },
                ].map((item) => (
                  <div key={item.label}>
                    <p
                      className="label"
                      style={{ color: c.metaLabel, marginBottom: '6px' }}
                    >
                      {item.label}
                    </p>
                    <p style={{ fontSize: '0.85rem', fontWeight: 500, color: c.metaValue }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Visuels ────────────────────────────── */}
      {chapter.visuals && chapter.visuals.length > 0 && (
        <div
          style={{
            maxWidth:        '1200px',
            margin:          '0 auto',
            paddingInline:   '56px',
            display:         'flex',
            flexDirection:   'column',
            gap:             '3px',
          }}
        >
          {chapter.visuals.map((visual, i) => (
            <VisualBlock key={i} visual={visual} dark={dark} />
          ))}
        </div>
      )}
    </section>
  )
}
