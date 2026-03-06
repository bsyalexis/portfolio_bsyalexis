import Link    from 'next/link'
import projets from '@/data/projets.json'

interface Props {
  currentSlug: string
}

const gradients: Record<string, string> = {
  video:  'linear-gradient(155deg, #302c2a 0%, #5e5a56 40%, #3a3634 100%)',
  photo:  'linear-gradient(155deg, #cec8c0 0%, #a8a098 40%, #888078 100%)',
  autres: 'linear-gradient(155deg, #b8bcbf 0%, #909498 40%, #6c7074 100%)',
}

const categoryLabels: Record<string, string> = {
  video:  'Vidéo',
  photo:  'Photographie',
  autres: 'Autres',
}

export default function NextProject({ currentSlug }: Props) {
  const current = projets.find((p) => p.slug === currentSlug)
  const nextSlug = (current as { nextProject?: string })?.nextProject
  if (!nextSlug) return null

  const next = projets.find((p) => p.slug === nextSlug)
  if (!next) return null

  return (
    <section
      style={{
        background:   '#111010',
        overflow:     'hidden',
        position:     'relative',
      }}
    >
      {/* Image de fond — légère et sombre */}
      <div
        style={{
          position:   'absolute',
          inset:      0,
          background: gradients[next.category] ?? gradients.photo,
          opacity:    0.12,
        }}
      />

      <div
        style={{
          position:      'relative',
          zIndex:        1,
          maxWidth:      '1200px',
          margin:        '0 auto',
          paddingInline: '56px',
          paddingTop:    '96px',
          paddingBottom: '96px',
        }}
      >
        {/* Label */}
        <p
          className="label"
          style={{
            color:         'rgba(255,255,255,0.32)',
            letterSpacing: '0.22em',
            marginBottom:  '28px',
          }}
        >
          Projet suivant
        </p>

        {/* Catégorie */}
        <p
          style={{
            fontSize:      '0.8rem',
            fontWeight:    400,
            color:         'rgba(255,255,255,0.45)',
            marginBottom:  '12px',
            letterSpacing: '0.06em',
          }}
        >
          {categoryLabels[next.category] ?? next.category}&nbsp;&middot;&nbsp;{next.client}&nbsp;&middot;&nbsp;{next.year}
        </p>

        {/* Titre géant cliquable */}
        <Link
          href={`/projet/${next.slug}`}
          style={{
            display:         'block',
            textDecoration:  'none',
            fontSize:        'clamp(3rem, 8vw, 7rem)',
            fontWeight:      700,
            letterSpacing:   '-0.04em',
            lineHeight:      1.0,
            color:           '#ffffff',
            transition:      'color 0.3s ease',
          }}
        >
          {next.title}
        </Link>

        {/* CTA arrow */}
        <div
          style={{
            display:     'flex',
            alignItems:  'center',
            gap:         '16px',
            marginTop:   '36px',
          }}
        >
          <Link
            href={`/projet/${next.slug}`}
            style={{
              display:         'inline-flex',
              alignItems:      'center',
              justifyContent:  'center',
              width:           '48px',
              height:          '48px',
              borderRadius:    '50%',
              background:      'var(--accent)',
              color:           '#ffffff',
              fontSize:        '1.15rem',
              textDecoration:  'none',
              flexShrink:      0,
              transition:      'background 0.2s ease',
            }}
          >
            &#8599;
          </Link>
          <span
            style={{
              fontSize:      '0.78rem',
              fontWeight:    500,
              color:         'rgba(255,255,255,0.45)',
              letterSpacing: '0.06em',
            }}
          >
            Voir le projet
          </span>
        </div>
      </div>
    </section>
  )
}
