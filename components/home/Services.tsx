'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { title: 'Vidéaste',       big: true  },
  { title: 'Photographe',    big: true  },
  { title: 'Direction Art.', big: false },
  { title: 'Communication',  big: false },
  { title: 'Webdesign',      big: false },
  { title: 'Graphisme',      big: false },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-word', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} style={{ paddingTop: '80px', paddingBottom: '80px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', paddingInline: '56px' }}>

        {/* En-tête */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '56px' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--text-mid)', margin: 0 }}>
            Ce que je <strong style={{ fontWeight: 700, color: 'var(--text)' }}>fais.</strong>
          </h2>
          <Link
            href="#contact"
            style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-mid)', textDecoration: 'none', letterSpacing: '0.04em', borderBottom: '1px solid var(--border)', paddingBottom: '2px' }}
          >
            Travaillons ensemble →
          </Link>
        </div>

        {/* Une seule ligne — grands à gauche, petits à droite alignés en bas */}
        <div
          className="svc-word"
          style={{
            display:     'flex',
            alignItems:  'baseline',
            gap:         '32px',
            borderTop:   '1px solid var(--border)',
            padding:     '28px 0',
          }}
        >
          {services.filter(s => s.big).map(s => (
            <span key={s.title} style={{
              fontSize:      'clamp(2.2rem, 4vw, 3.6rem)',
              fontWeight:    300,
              letterSpacing: '-0.03em',
              color:         'var(--text)',
              lineHeight:    1,
            }}>
              {s.title}
            </span>
          ))}

          <span style={{ color: 'var(--border)', fontSize: '1.2rem', fontWeight: 300 }}>—</span>

          {services.filter(s => !s.big).map((s, i, arr) => (
            <span key={s.title} style={{ display: 'inline-flex', alignItems: 'baseline', gap: '20px' }}>
              <span style={{
                fontSize:      'clamp(0.78rem, 1vw, 0.88rem)',
                fontWeight:    400,
                letterSpacing: '-0.01em',
                color:         'var(--text-mid)',
                whiteSpace:    'nowrap',
              }}>
                {s.title}
              </span>
              {i < arr.length - 1 && <span style={{ color: 'var(--border)', fontSize: '0.7rem' }}>·</span>}
            </span>
          ))}
        </div>

      </div>
    </section>
  )
}
