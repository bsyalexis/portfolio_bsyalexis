import Link from 'next/link'

interface Projet {
  slug: string
  title: string
  client: string
  category: string
  year: string
  ratio?: string
  cover?: string
  coverVideo?: string
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

export default function ProjetCard({ projet }: { projet: Projet }) {
  const bg = gradients[projet.category] ?? gradients.photo

  return (
    <Link href={`/projet/${projet.slug}`} className="projet-card">

      {/* Visuel */}
      <div className="card-img-wrap">
        {projet.coverVideo ? (
          <video
            autoPlay loop muted playsInline
            className="card-img"
            style={{ objectFit: 'cover' }}
          >
            <source src={projet.coverVideo} type="video/webm" />
          </video>
        ) : (
          <div
            className="card-img"
            style={{
              background: projet.cover
                ? `url(${projet.cover}) center/cover no-repeat, ${bg}`
                : bg,
            }}
          />
        )}
        {projet.category === 'video' && (
          <div className="video-badge">&#9654;&nbsp;Vidéo</div>
        )}
      </div>

      {/* Méta — sous l'image */}
      <div className="card-meta">
        <p className="card-cat">
          {categoryLabels[projet.category] ?? projet.category}&ensp;·&ensp;{projet.year}
        </p>
        <p className="card-title">{projet.title}</p>
        <p className="card-client">{projet.client}</p>
      </div>

    </Link>
  )
}
