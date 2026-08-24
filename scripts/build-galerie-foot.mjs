/**
 * Prépare la galerie foot : vignettes WebP + manifeste ordonné.
 *
 * La page /galerie-foot-* réunit toutes les photos des projets de football en
 * une seule grille. Servir les fichiers d'origine y coûterait une trentaine de
 * mégaoctets : c'est tenable sur une page projet de vingt photos, pas sur une
 * page de cinquante que des clubs ouvriront depuis un téléphone. On génère
 * donc une version calibrée pour la grille, et on garde le fichier d'origine
 * pour la vue plein écran, où la définition se voit.
 *
 * Le manifeste porte aussi l'ordre définitif : le mélange est tiré ici, avec
 * une graine fixe, plutôt qu'au rendu. Une galerie qui se réordonne à chaque
 * build n'est pas un lien qu'on envoie par mail.
 *
 *   node scripts/build-galerie-foot.mjs
 */
import sharp from 'sharp'
import { readdir, mkdir, writeFile, stat } from 'fs/promises'
import { readFile } from 'fs/promises'
import { join, basename, extname } from 'path'

const SLUGS   = ['st-ferre-coupe-haute-loire', 'fc-saint-chamond', 'fc-saint-joseph']

/* Première rangée, choisie et non tirée au sort : c'est elle qui décide si un
   club fait défiler la page. Un club par photo, trois registres différents
   (portrait, duel, détail). Le reste de la galerie est mélangé. */
const OUVERTURE = [
  'fc-saint-chamond/A7409762',
  'st-ferre-coupe-haute-loire/A7401455',
  'fc-saint-joseph/HERO',
]
const SOURCE  = 'public/images/projets'
const SORTIE  = 'public/images/galerie-foot'
const MANIFEST = 'data/galerie-foot.json'

/* Visuels réseaux : leurs exports plein format vivent hors du site, comme les
   photos d'origine. Le dossier peut être vide, la page saute alors la section. */
const VISUELS_SOURCE = '../archive/visuels-foot'
const VISUELS_SORTIE = 'public/images/galerie-foot/visuels'
// Ces visuels se lisent, contrairement à une photo : sous 1400 px le texte des
// petites lignes commence à baver.
const VISUELS_LARGEUR = 1400

/* Largeur de vignette : une cellule occupe au plus un tiers d'une grille de
   1600 px, soit ~530 px, x2 pour les écrans retina. Au-delà on paie du poids
   que personne ne voit. */
const LARGEUR = 1200
const QUALITE = 78

/* Générateur déterministe : même graine, même galerie, à chaque build. */
function alea(graine) {
  let a = graine >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function melanger(liste, rnd) {
  const out = [...liste]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/* Un nom de fichier d'export finit dans une URL : accents, espaces et
   parenthèses n'y ont pas leur place. */
function assainir(nom) {
  return nom
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/* Round-robin entre les clubs : deux photos voisines viennent rarement du
   même match, ce qui est tout l'intérêt d'une galerie commune. */
function entrelacer(paquets) {
  const out = []
  const max = Math.max(...paquets.map((p) => p.length))
  for (let i = 0; i < max; i++) {
    for (const p of paquets) if (p[i]) out.push(p[i])
  }
  return out
}

const projets = JSON.parse(await readFile('data/projets.json', 'utf8'))

await mkdir(SORTIE, { recursive: true })

const rnd = alea(51207)
const paquets = []
let poidsSource = 0
let poidsVignette = 0

for (const slug of SLUGS) {
  const projet = projets.find((p) => p.slug === slug)
  if (!projet) throw new Error(`projet introuvable dans projets.json : ${slug}`)

  const dossier = join(SOURCE, slug)
  const fichiers = (await readdir(dossier))
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f) && !f.startsWith('.'))
    .sort()

  const photos = []

  for (const fichier of fichiers) {
    const src  = join(dossier, fichier)
    const nom  = `${slug}__${basename(fichier, extname(fichier))}.webp`
    const dest = join(SORTIE, nom)

    const meta = await sharp(src).metadata()
    poidsSource += (await stat(src)).size

    // Une vignette déjà générée n'est pas réécrite : le script doit pouvoir
    // être relancé pour ajouter un match sans repasser sur les autres.
    let dejaLa = true
    try { await stat(dest) } catch { dejaLa = false }

    if (!dejaLa) {
      await sharp(src)
        .resize({ width: LARGEUR, height: LARGEUR, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: QUALITE })
        .toFile(dest)
    }
    poidsVignette += (await stat(dest)).size

    photos.push({
      vignette: `/images/galerie-foot/${nom}`,
      pleine:   `/${src.replace(/^public\//, '')}`,
      ratio:    Number((meta.width / meta.height).toFixed(3)),
      club:     projet.client,
      projet:   slug,
    })
  }

  console.log(`── ${slug} : ${photos.length} photo(s)`)
  paquets.push(melanger(photos, rnd))
}

/* L'ouverture est retirée du mélange avant d'être remise en tête : sans ça
   une de ses photos réapparaîtrait plus bas dans la page. */
const cle = (p) => p.vignette.replace('/images/galerie-foot/', '').replace('.webp', '').replace('__', '/')

const toutes = entrelacer(paquets)
const tete = OUVERTURE.map((id) => {
  const photo = toutes.find((p) => cle(p) === id)
  if (!photo) throw new Error(`photo d'ouverture introuvable : ${id}`)
  return photo
})
const photos = [...tete, ...toutes.filter((p) => !OUVERTURE.includes(cle(p)))]

/* ── Visuels réseaux ── */
await mkdir(VISUELS_SORTIE, { recursive: true })

let sourcesVisuels = []
try {
  sourcesVisuels = (await readdir(VISUELS_SOURCE))
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f) && !f.startsWith('.'))
    .sort()
} catch {
  console.log(`\n(pas de dossier ${VISUELS_SOURCE}, section visuels ignorée)`)
}

const visuels = []
for (const fichier of sourcesVisuels) {
  const src  = join(VISUELS_SOURCE, fichier)
  const nom  = `${assainir(basename(fichier, extname(fichier)))}.webp`
  const dest = join(VISUELS_SORTIE, nom)

  const meta = await sharp(src).metadata()

  let dejaLa = true
  try { await stat(dest) } catch { dejaLa = false }
  if (!dejaLa) {
    await sharp(src)
      .resize({ width: VISUELS_LARGEUR, height: VISUELS_LARGEUR, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 86 })
      .toFile(dest)
  }

  visuels.push({
    image: `/images/galerie-foot/visuels/${nom}`,
    ratio: Number((meta.width / meta.height).toFixed(3)),
  })
}
if (visuels.length) console.log(`── visuels réseaux : ${visuels.length}`)

await writeFile(MANIFEST, JSON.stringify({ photos, visuels }, null, 2) + '\n')

const mo = (o) => (o / 1048576).toFixed(1) + ' Mo'
console.log(`\n${photos.length} photos et ${visuels.length} visuels dans ${MANIFEST}`)
console.log(`grille : ${mo(poidsVignette)} au lieu de ${mo(poidsSource)}`)
