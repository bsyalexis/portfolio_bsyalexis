'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { num: '01', title: 'Vidéaste',           desc: 'Films de marque, teasers produit, documentaires corporate.' },
  { num: '02', title: 'Photographe',        desc: 'Corporate, produit, événementiel. Images nettes et cohérentes.' },
  { num: '03', title: 'Direction Art.',     desc: 'Identité visuelle, charte graphique, supervision de campagnes.' },
  { num: '04', title: 'Communication',      desc: 'Stratégie visuelle, contenus réseaux, supports print & digital.' },
  { num: '05', title: 'Webdesign',          desc: 'Sites vitrine, landing pages, interfaces — design & intégration.' },
  { num: '06', title: 'Graphisme',          desc: 'Identité de marque, typographie, mise en page éditoriale.' },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-row', {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.07,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} style={{ paddingTop: '80px', paddingBottom: '80px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', paddingInline: '56px' }}>

        {/* En-tête */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '40px' }}>
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

        {/* Liste services */}
        <div>
          {services.map((s, i) => (
            <div
              key={s.num}
              className="svc-row"
              style={{
                display:       'grid',
                gridTemplateColumns: '36px 1fr 2fr',
                gap:           '24px',
                alignItems:    'center',
                padding:       '18px 0',
                borderTop:     '1px solid var(--border)',
                ...(i === services.length - 1 ? { borderBottom: '1px solid var(--border)' } : {}),
              }}
            >
              <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent)' }}>
                {s.num}
              </span>
              <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em' }}>
                {s.title}
              </span>
              <span style={{ fontSize: '0.82rem', fontWeight: 300, color: 'var(--text-mid)', lineHeight: 1.5 }}>
                {s.desc}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
