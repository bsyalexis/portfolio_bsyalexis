/**
 * Découpage d'une suite de photos en rangées à hauteur homogène.
 *
 * Extrait de components/projet/PhotoGallery, qui reste son premier appelant :
 * la galerie foot pose exactement le même problème sur cinquante photos issues
 * de trois reportages, et dupliquer l'algorithme aurait fait diverger les deux
 * rendus au premier réglage.
 */

/* Une rangée : combien de colonnes, quels indices, et la forme du bloc.
   `aspect` est le ratio du conteneur, pas d'une image : c'est lui qui fixe la
   hauteur en CSS, donc la rangée reste proportionnelle à toutes les largeurs
   d'écran là où une hauteur en pixels ne l'était pas. */
export interface Row { cols: number; idx: number[]; aspect: number }

/* Nombre d'images par rangée, alterné pour éviter une grille monotone.
   Les portraits passent par 3 et 4 : au-delà, la vignette devient timbre-poste ;
   en dessous de 3, la rangée est plus haute que large. */
const CYCLE_PORTRAIT = [3, 4, 3]
const CYCLE_PAYSAGE  = [2, 3]

export const estPortrait = (a: number) => a < 1

/* Plancher de ratio : en deçà, la rangée devient plus haute que deux écrans.
   Ne mord que sur les cas dégénérés (une seule image d'une orientation). */
const RATIO_MIN = 1.6

/** Découpe un ensemble d'indices en rangées, sans jamais laisser de reliquat
 *  isolé : une image seule sur sa ligne occuperait toute la largeur et se
 *  déroulerait sur plus de 2000 px de haut. Le reste est absorbé par la
 *  dernière rangée. */
function decouper(pool: number[], cycle: number[], mini: number): number[][] {
  const out: number[][] = []
  let i = 0
  let c = 0
  while (i < pool.length) {
    const reste = pool.length - i
    let n = Math.min(cycle[c++ % cycle.length], reste)
    if (reste - n > 0 && reste - n < mini) n = reste
    out.push(pool.slice(i, i + n))
    i += n
  }
  return out
}

/**
 * Découpe les images en rangées homogènes en orientation.
 *
 * Les cellules d'une même ligne partagent leur hauteur : y mélanger portrait
 * et paysage force forcément le rognage de l'un des deux. On sépare donc les
 * deux orientations en amont (et non au fil de la liste, sinon l'alternance
 * issue du dé-groupage produit des séries d'une seule image), puis on
 * répartit les rangées paysage parmi les portraits pour garder du rythme.
 * La hauteur de chaque rangée se déduit du ratio moyen de son contenu : c'est
 * ce qui rend les photos visibles en entier plutôt qu'en bande recadrée.
 *
 * `decalage` est l'indice de la première image du lot dans la liste complète :
 * les rangées renvoient des indices utilisables tels quels côté galerie.
 */
export function buildRows(aspects: number[], decalage: number): Row[] {
  const portraits: number[] = []
  const paysages:  number[] = []
  aspects.forEach((a, i) => (estPortrait(a) ? portraits : paysages).push(i))

  const rp = decouper(portraits, CYCLE_PORTRAIT, 3)
  const rl = decouper(paysages,  CYCLE_PAYSAGE,  2)

  const ordre: number[][] = []
  const pas = rl.length ? Math.max(1, Math.round(rp.length / (rl.length + 1))) : Infinity
  let li = 0
  rp.forEach((r, i) => {
    ordre.push(r)
    if (li < rl.length && (i + 1) % pas === 0) ordre.push(rl[li++])
  })
  while (li < rl.length) ordre.push(rl[li++])

  return ordre.map((idxs) => {
    const moyen = idxs.reduce((s, i) => s + aspects[i], 0) / idxs.length
    // Chaque cellule fait 1/n de la largeur ; sa hauteur vaut cette largeur
    // divisée par le ratio de l'image, d'où le ratio du conteneur.
    return {
      cols:   idxs.length,
      idx:    idxs.map((i) => decalage + i),
      aspect: Math.max(RATIO_MIN, idxs.length * moyen),
    }
  })
}
