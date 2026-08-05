import Link from 'next/link'
import { formatProjetDate } from '@/lib/date'

interface Projet {
  slug: string
  title: string
  client: string
  category: string
  year: string
  date?: string   // « AAAA-MM », affiche le mois quand on le connaît
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
  'video-photo': 'Vidéo & Photographie',
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
            /* Le cover fait office d'image d'attente : sans lui la carte reste
               vide le temps que la boucle arrive, et grise si le navigateur
               refuse de décoder. */
            poster={projet.cover}
          >
            {/* Le type est déduit de l'extension : la grille mélange des
                boucles .webm et .mp4 selon la source dont on dispose, et un
                type erroné fait rejeter la source sans message. */}
            <source
              src={projet.coverVideo}
              type={projet.coverVideo.endsWith('.webm') ? 'video/webm' : 'video/mp4'}
            />
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

      {/* Méta, sous l'image */}
      <div className="card-meta">
        <p className="card-cat">
          {categoryLabels[projet.category] ?? projet.category}&ensp;·&ensp;{formatProjetDate(projet.date, projet.year)}
        </p>
        <p className="card-title">{projet.title}</p>
        <p className="card-client">{projet.client}</p>
      </div>

    </Link>
  )
}
