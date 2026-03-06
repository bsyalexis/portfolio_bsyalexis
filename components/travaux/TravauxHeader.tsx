'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Props {
  activeFilter: string
  count: number
  onFilter: (f: string) => void
}

const FILTERS = [
  { key: 'all',   label: 'Tous' },
  { key: 'video', label: 'Vidéo' },
  { key: 'photo', label: 'Photo' },
  { key: 'autres', label: 'Autres' },
]

export default function TravauxHeader({ activeFilter, count, onFilter }: Props) {
  const lineRef    = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const titleRef   = useRef<HTMLHeadingElement>(null)
  const pillsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from(eyebrowRef.current, { opacity: 0, y: 12, duration: 0.6 })
      .from(titleRef.current,   { opacity: 0, y: 20, duration: 0.7 }, '-=0.3')
      .fromTo(lineRef.current,  { scaleX: 0 }, { scaleX: 1, duration: 0.9, transformOrigin: 'left' }, '-=0.4')
      .from(pillsRef.current,   { opacity: 0, y: 10, duration: 0.5 }, '-=0.5')
  }, [])

  return (
    <header
      style={{
        paddingTop:    '128px',
        paddingBottom: '56px',
        maxWidth:      '1200px',
        margin:        '0 auto',
        paddingInline: '56px',
      }}
    >
      {/* Eyebrow */}
      <p
        ref={eyebrowRef}
        className="label"
        style={{ color: 'var(--accent)', letterSpacing: '0.22em', marginBottom: '14px' }}
      >
        Tous les travaux
      </p>

      {/* Titre */}
      <h1
        ref={titleRef}
        style={{
          fontSize:      'clamp(3.5rem, 6vw, 5.5rem)',
          fontWeight:    300,
          letterSpacing: '-0.04em',
          lineHeight:    1.0,
          color:         'var(--text)',
          margin:        0,
          marginBottom:  '36px',
        }}
      >
        Travaux.
      </h1>

      {/* Ligne cerise */}
      <div
        ref={lineRef}
        style={{
          width:      '100%',
          height:     '1px',
          background: 'var(--accent)',
          marginBottom: '32px',
        }}
      />

      {/* Pills + compteur */}
      <div
        ref={pillsRef}
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          flexWrap:       'wrap',
          gap:            '12px',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`filter-pill${activeFilter === f.key ? ' active' : ''}`}
              onClick={() => onFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span
          style={{
            fontSize:      '0.7rem',
            fontWeight:    500,
            color:         'var(--text-mid)',
            letterSpacing: '0.06em',
          }}
        >
          {count}&nbsp;projet{count > 1 ? 's' : ''}
        </span>
      </div>
    </header>
  )
}
