import Link from 'next/link'

interface Projet {
  slug: string
  title: string
  client: string
  category: string
  year: string
  ratio?: string
  cover?: string
}

const gradients: Record<string, string> = {
  video:  'linear-gradient(155deg, #2e2a28 0%, #5c5250 40%, #3e3a38 100%)',
  photo:  'linear-gradient(155deg, #d0c8c0 0%, #b0a898 40%, #948880 100%)',
  autres: 'linear-gradient(155deg, #b8bcc0 0%, #909498 40%, #707478 100%)',
}

const categoryLabels: Record<string, string> = {
  video:  'Vidéo',
  photo:  'Photographie',
  autres: 'Autres',
}

function ratioToCss(ratio: string = '16:9'): string {
  return ratio.replace(':', '/')
}

export default function ProjetCard({ projet }: { projet: Projet }) {
  const bg = gradients[projet.category] ?? gradients.photo

  return (
    <Link
      href={`/projet/${projet.slug}`}
      className="projet-card"
      style={{ aspectRatio: ratioToCss(projet.ratio) }}
    >
      {/* Fond — gradient ou image */}
      <div
        className="card-img"
        style={{
          background: projet.cover
            ? `url(${projet.cover}) center/cover no-repeat, ${bg}`
            : bg,
        }}
      />

      {/* Icône vidéo */}
      {projet.category === 'video' && (
        <div className="video-icon">&#9654;</div>
      )}

      {/* Overlay sombre */}
      <div className="card-overlay" />

      {/* Infos au survol */}
      <div className="card-info">
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div>
            <p
              className="label"
              style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '5px' }}
            >
              {categoryLabels[projet.category] ?? projet.category}&nbsp;&middot;&nbsp;{projet.year}
            </p>
            <p
              style={{
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#ffffff',
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
              }}
            >
              {projet.title}
            </p>
            <p
              style={{
                fontSize: '0.72rem',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.52)',
                marginTop: '3px',
              }}
            >
              {projet.client}
            </p>
          </div>
          <div className="card-arrow">&#8599;</div>
        </div>
      </div>
    </Link>
  )
}
