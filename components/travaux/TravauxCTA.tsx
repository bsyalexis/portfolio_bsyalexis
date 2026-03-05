import Link from 'next/link'

export default function TravauxCTA() {
  return (
    <section style={{ background: '#111010', padding: '120px 0' }}>
      <div
        style={{
          maxWidth:      '900px',
          margin:        '0 auto',
          paddingInline: '56px',
          textAlign:     'center',
        }}
      >
        {/* Label */}
        <p
          className="label"
          style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.22em', marginBottom: '28px' }}
        >
          Collaborer
        </p>

        {/* Heading double ligne */}
        <h2
          style={{
            fontSize:      'clamp(2.2rem, 4.5vw, 4rem)',
            fontWeight:    300,
            letterSpacing: '-0.03em',
            lineHeight:    1.15,
            color:         '#ffffff',
            margin:        0,
          }}
        >
          Tu as vu ce que je fais.
        </h2>
        <h2
          style={{
            fontSize:      'clamp(2.2rem, 4.5vw, 4rem)',
            fontWeight:    700,
            letterSpacing: '-0.03em',
            lineHeight:    1.15,
            color:         '#ffffff',
            margin:        0,
            marginBottom:  '52px',
          }}
        >
          Travaillons ensemble.
        </h2>

        {/* CTA cerise */}
        <Link
          href="/#contact"
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '10px',
            padding:        '14px 34px',
            borderRadius:   '100px',
            background:     'var(--accent)',
            color:          '#ffffff',
            fontSize:       '0.85rem',
            fontWeight:     600,
            textDecoration: 'none',
            letterSpacing:  '0.02em',
            transition:     'background 0.2s ease, transform 0.2s ease',
          }}
        >
          Engager la conversation&nbsp;&#8599;
        </Link>
      </div>
    </section>
  )
}
