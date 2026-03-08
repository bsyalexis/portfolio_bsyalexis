'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Projet {
  title:       string
  client:      string
  category:    string
  year:        string
  cover?:      string
  heroImage?:  string   // image de fond hero (si différente du cover carte)
  vimeoId?:    string
}

interface Props {
  projet: Projet
}

const gradients: Record<string, string> = {
  video:  'radial-gradient(ellipse at 30% 35%, rgba(255,255,255,0.12) 0%, transparent 50%), linear-gradient(155deg, #302c2a 0%, #5e5a56 40%, #3a3634 100%)',
  photo:  'radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.2) 0%, transparent 55%), linear-gradient(155deg, #cec8c0 0%, #a8a098 40%, #888078 100%)',
  autres: 'radial-gradient(ellipse at 60% 35%, rgba(255,255,255,0.15) 0%, transparent 50%), linear-gradient(155deg, #b8bcbf 0%, #909498 40%, #6c7074 100%)',
}

const categoryLabels: Record<string, string> = {
  video:  'Vidéo',
  photo:  'Photographie',
  autres: 'Autres',
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

  const heroSrc = projet.heroImage ?? projet.cover
  const bg = heroSrc
    ? `url(${heroSrc}) center/cover no-repeat, ${gradients[projet.category] ?? gradients.photo}`
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
      {/* Vidéo Vimeo en fond */}
      {projet.vimeoId && (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }} aria-hidden="true">
          <iframe
            src={`https://player.vimeo.com/video/${projet.vimeoId}?background=1&autoplay=1&loop=1&muted=1`}
            style={{
              position:  'absolute',
              top:       '50%',
              left:      '50%',
              width:     '100vw',
              height:    '56.25vw',
              minHeight: '100%',
              minWidth:  '177.78vh',
              transform: 'translate(-50%, -50%)',
              border:    'none',
              pointerEvents: 'none',
            }}
            allow="autoplay"
            frameBorder="0"
          />
        </div>
      )}

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

    </div>
  )
}
