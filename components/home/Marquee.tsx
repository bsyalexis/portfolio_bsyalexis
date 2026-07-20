/**
 * Bandeau défilant.
 *
 * L'ordre des entrées porte la répartition 40 / 40 / 20 : sur cinq items,
 * deux photo, deux vidéo, un direction artistique. Ne pas ajouter de métier
 * ici sans recalculer la proportion.
 */
const ITEMS = [
  'Photographie',
  'Vidéo',
  'Reportage sportif',
  'Films de marque',
  'Direction artistique',
]

export default function Marquee() {
  return (
    <section className="mq" aria-label="Domaines d'intervention">
      {/* La piste est dupliquée : l'animation translate de -50%, donc au
          moment où la première copie sort du cadre la seconde occupe
          exactement sa place et la boucle est invisible. Une seule copie
          laisserait un trou à chaque tour. */}
      <div className="mq__track">
        {[0, 1].map((copy) => (
          <div className="mq__group" key={copy} aria-hidden={copy === 1}>
            {ITEMS.map((item) => (
              <span className="mq__item" key={item}>
                {item}
                <span className="mq__sep" aria-hidden="true">✳</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
