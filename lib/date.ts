const MOIS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
]

/**
 * Libellé de date d'un projet.
 *
 * Les projets récents portent un champ `date` au format « AAAA-MM » et
 * s'affichent au mois près ; les plus anciens n'ont qu'une année et restent
 * affichés tels quels. Toute valeur qu'on ne sait pas lire retombe sur
 * l'année : mieux vaut une date grossière qu'un « Invalid Date » en page.
 */
export function formatProjetDate(date: string | undefined, year: string): string {
  if (!date) return year

  const m = /^(\d{4})-(\d{2})$/.exec(date)
  if (!m) return year

  const mois = MOIS[Number(m[2]) - 1]
  return mois ? `${mois} ${m[1]}` : m[1]
}
