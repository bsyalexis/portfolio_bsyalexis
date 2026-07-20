import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'

interface Asset {
  src: string
  slug: string
  alt: string
  /** Rendu en vidéo muette en boucle plutôt qu'en image. */
  video?: boolean
}

interface Block {
  tag: string
  title: string
  lead: string
  filter: string
  assets: Asset[]
}

/* Trois blocs, dans l'ordre du positionnement : la photo et la vidéo à parts
   égales, la direction artistique en appoint. Le bloc photo occupe toute la
   largeur, les deux autres se partagent la ligne suivante — ce qui donne
   visuellement le rapport 40 / 40 / 20 sans avoir à l'écrire. */
const BLOCKS: Block[] = [
  {
    tag: 'Photographie',
    title: 'Le terrain, à hauteur de joueur.',
    lead: 'Reportage de match, portraits, coulisses. Je passe la rencontre en bord de touche pour ramener les images que personne ne voit depuis les tribunes.',
    filter: 'photo',
    assets: [
      { src: '/images/projets/st-ferre-coupe-haute-loire/A7401121.jpg', slug: 'st-ferre-coupe-haute-loire', alt: 'Joueurs de l’A.S Saint-Ferréol dans le tunnel avant la finale' },
      { src: '/images/projets/fc-saint-chamond/A7409762.jpg',           slug: 'fc-saint-chamond',           alt: 'Duel aérien lors d’un match du FC Saint-Chamond' },
      { src: '/images/projets/st-ferre-coupe-haute-loire/A7400868.jpg', slug: 'st-ferre-coupe-haute-loire', alt: 'Tribunes de la finale Régis Fay' },
      { src: '/images/projets/fc-saint-joseph/A7402376.webp',           slug: 'fc-saint-joseph',            alt: 'Action de jeu au FC Saint-Joseph' },
      { src: '/images/projets/bouillon-de-famille/A7406771.webp',       slug: 'bouillon-de-famille',        alt: 'Plat dressé au Bouillon de Famille' },
      { src: '/images/projets/fc-saint-chamond/A7409637.jpg',           slug: 'fc-saint-chamond',           alt: 'Célébration après un but du FC Saint-Chamond' },
    ],
  },
  {
    tag: 'Vidéo',
    title: 'Des films qui tiennent en haleine.',
    lead: 'Trailers, films de marque, formats courts pensés pour les réseaux. Du repérage au montage.',
    filter: 'video',
    assets: [
      { src: '/images/projets/eva-cl/TRANSFO.webm', slug: 'eva-challenger-league', alt: 'Extrait du trailer EVA Challenger League', video: true },
      { src: '/images/projets/studio-lens/HERO.webp', slug: 'studio-lens', alt: 'Portrait au Studio Len’s' },
      { src: '/images/projets/eva-cl/3.webp', slug: 'eva-challenger-league', alt: 'Image du trailer EVA Challenger League' },
    ],
  },
  {
    tag: 'Direction artistique',
    title: 'Une ligne avant les images.',
    lead: 'Quand un projet a besoin d’un parti pris avant d’avoir des visuels : identité, univers, direction de campagne.',
    filter: 'autres',
    assets: [
      { src: '/images/projets/astral-esport/MISE%20EN%20AVANT.webp', slug: 'astral-esport', alt: 'Direction artistique pour Astral — EVA Esport' },
      { src: '/images/projets/bouillon-de-famille/A7406978.webp', slug: 'bouillon-de-famille', alt: 'Mise en scène culinaire au Bouillon de Famille' },
      { src: '/images/projets/st-ferre-coupe-haute-loire/A7401264.jpg', slug: 'st-ferre-coupe-haute-loire', alt: 'Trophée de la finale Régis Fay' },
    ],
  },
]

function Media({ asset }: { asset: Asset }) {
  return (
    <Link
      href={`/projet/${asset.slug}`}
      className="works__asset"
      data-cursor="VOIR"
      aria-label={asset.alt}
    >
      {asset.video ? (
        <video autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src={asset.src} type="video/webm" />
        </video>
      ) : (
        <img src={asset.src} alt="" loading="lazy" decoding="async" />
      )}
    </Link>
  )
}

function BlockCard({ block, wide }: { block: Block; wide?: boolean }) {
  return (
    <article className={`works__card${wide ? ' works__card--wide' : ''}`}>
      <p className="works__tag">
        <span className="works__dot" aria-hidden="true" />
        {block.tag}
      </p>

      <div className="works__collage">
        {block.assets.map((a) => <Media key={a.src} asset={a} />)}
      </div>

      <div className="works__text">
        <Reveal as="h3" split className="works__title" stagger={0.04}>
          {block.title}
        </Reveal>
        <p className="works__lead">{block.lead}</p>
        <Link href={`/travaux?filter=${block.filter}`} className="works__cta" data-cursor="TRAVAUX">
          Voir les projets
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}

/**
 * Présentation des travaux en blocs éditoriaux.
 *
 * Remplace le carrousel en position sticky, qui mobilisait près de quatre
 * écrans de défilement pour sept projets. Ici chaque métier a son bloc, son
 * collage et sa porte d'entrée vers les projets correspondants : le contenu
 * défile normalement, et la page reprend une longueur lisible.
 *
 * Composant serveur — aucune interactivité propre, seuls les titres animent
 * via Reveal. Rien de tout ça n'a besoin de JavaScript pour s'afficher.
 */
export default function Works() {
  return (
    <section id="travaux" className="works">
      <header className="works__head">
        <span className="works__eyebrow">
          <span className="works__eyebrow-dash" aria-hidden="true" />
          Sélection de projets
        </span>
      </header>

      <BlockCard block={BLOCKS[0]} wide />
      <div className="works__row">
        <BlockCard block={BLOCKS[1]} />
        <BlockCard block={BLOCKS[2]} />
      </div>
    </section>
  )
}
