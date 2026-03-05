import Link    from 'next/link'
import projets from '@/data/projets.json'

interface Props {
  currentSlug: string
}

export default function ProjectNav({ currentSlug }: Props) {
  const current = projets.find((p) => p.slug === currentSlug)
  if (!current) return null

  const prev = (current as { prevProject?: string }).prevProject
    ? projets.find((p) => p.slug === (current as { prevProject?: string }).prevProject)
    : null
  const next = (current as { nextProject?: string }).nextProject
    ? projets.find((p) => p.slug === (current as { nextProject?: string }).nextProject)
    : null

  return (
    <nav
      style={{
        borderTop:  '1px solid var(--border)',
        background: 'var(--bg)',
        paddingBlock: '44px',
      }}
    >
      <div
        className="project-nav-inner"
        style={{
          maxWidth:        '1200px',
          margin:          '0 auto',
          paddingInline:   '56px',
          display:         'flex',
          justifyContent:  'space-between',
          alignItems:      'center',
          gap:             '24px',
        }}
      >
        {/* Précédent */}
        {prev ? (
          <Link href={`/projet/${prev.slug}`} className="project-nav-link">
            <p className="label" style={{ color: 'var(--text-dim)', marginBottom: '6px' }}>
              ← Précédent
            </p>
            <p
              className="nav-title"
              style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)' }}
            >
              {prev.title}
            </p>
          </Link>
        ) : (
          <div />
        )}

        {/* Suivant */}
        {next ? (
          <Link
            href={`/projet/${next.slug}`}
            className="project-nav-link"
            style={{ textAlign: 'right' }}
          >
            <p className="label" style={{ color: 'var(--text-dim)', marginBottom: '6px' }}>
              Suivant →
            </p>
            <p
              className="nav-title"
              style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)' }}
            >
              {next.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  )
}
