'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Projet {
  title:    string
  client:   string
  category: string
  year:     string
  cover?:   string
}

interface Props {
  projet: Projet
}

const gradients: Record<string, string> = {
  video: 'linear-gradient(160deg, #b5aea6 0%, #6a6460 100%)',
  photo: 'linear-gradient(160deg, #c2b8a8 0%, #8a8078 100%)',
  da:    'linear-gradient(160deg, #a8a09a 0%, #686058 100%)',
}

const categoryLabels: Record<string, string> = {
  video: 'Vidéo',
  photo: 'Photographie',
  da:    'Direction Artistique',
}

export default function ProjectHero({ projet }: Props) {
  const heroRef  = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const metaRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(metaRef.current, {
        opacity: 0, y: 16, duration: 0.8, ease: 'power2.out', delay: 0.3,
      })
      gsap.from(titleRef.current, {
        opacity: 0, y: 28, duration: 1, ease: 'power3.out', delay: 0.5,
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const bg = projet.cover
    ? `url(${projet.cover}) center/cover no-repeat, ${gradients[projet.category] ?? gradients.photo}`
    : (gradients[projet.category] ?? gradients.photo)

  return (
    <div
      ref={heroRef}
      style={{
        position:  'relative',
        height:    '100vh',
        minHeight: '580px',
        overflow:  'hidden',
        background: bg,
      }}
    >
      {/* Gradient overlay bas */}
      <div
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to top, rgba(17,16,16,0.78) 0%, rgba(17,16,16,0.12) 55%, transparent 100%)',
          zIndex:     1,
        }}
      />

      {/* Contenu bas-gauche */}
      <div
        style={{
          position:      'absolute',
          bottom:        0,
          left:          0,
          right:         0,
          padding:       '64px 56px',
          zIndex:        2,
        }}
      >
        {/* Meta row */}
        <div
          ref={metaRef}
          className="project-hero-meta"
          style={{ display: 'flex', gap: '32px', marginBottom: '24px' }}
        >
          {[
            { label: 'Client', value: projet.client },
            { label: 'Année',  value: projet.year   },
            { label: 'Type',   value: categoryLabels[projet.category] ?? projet.category },
          ].map((item) => (
            <div key={item.label}>
              <p
                className="label"
                style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '4px' }}
              >
                {item.label}
              </p>
              <p style={{ fontSize: '0.82rem', fontWeight: 500, color: 'rgba(255,255,255,0.88)' }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Titre */}
        <h1
          ref={titleRef}
          style={{
            fontSize:      'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight:    700,
            letterSpacing: '-0.03em',
            lineHeight:    1.05,
            color:         '#ffffff',
            margin:        0,
            maxWidth:      '720px',
          }}
        >
          {projet.title}
        </h1>
      </div>

      {/* Scroll indicator — bas droite */}
      <div
        style={{
          position: 'absolute',
          bottom:   '64px',
          right:    '56px',
          zIndex:   2,
          width:    '88px',
          height:   '88px',
        }}
      >
        {/* SVG circulaire rotatif */}
        <svg
          className="circular-text"
          viewBox="0 0 120 120"
          width="88"
          height="88"
          style={{ position: 'absolute', inset: 0 }}
          aria-hidden="true"
        >
          <path
            id="proj-scroll-path"
            d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
            fill="none"
          />
          <text style={{ fontSize: '10px', fill: 'rgba(255,255,255,0.55)', fontWeight: 500, letterSpacing: '0.14em' }}>
            <textPath href="#proj-scroll-path">
              {'SCROLL · SCROLL · SCROLL · '}
            </textPath>
          </text>
        </svg>
        {/* Flèche centrale */}
        <div
          style={{
            position:        'absolute',
            inset:           0,
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            color:           'rgba(255,255,255,0.65)',
            fontSize:        '1.25rem',
          }}
        >
          ↓
        </div>
      </div>
    </div>
  )
}
