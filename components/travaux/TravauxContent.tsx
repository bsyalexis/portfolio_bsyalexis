'use client'

import { useEffect, useState } from 'react'
import TravauxHeader from './TravauxHeader'
import ProjetGrid    from './ProjetGrid'

interface Projet {
  slug:     string
  title:    string
  client:   string
  category: string
  year:     string
  date?:    string   // « AAAA-MM », affiche le mois quand on le connaît
  ratio?:   string
  cover?:   string
  featured?: boolean
}

interface Props {
  projets: Projet[]
}

const FILTRES = ['video', 'photo', 'autres']

/**
 * Grille des travaux et son filtre.
 *
 * Le filtre est tenu en état React et non lu par `useSearchParams`. Ce hook
 * fait basculer tout son sous-arbre en rendu client : la page ne livrait
 * qu'un bloc vide de 60vh, et le visiteur mobile regardait un écran blanc
 * jusqu'au démarrage du JavaScript. Ici le serveur rend la grille complète,
 * qui est déjà la bonne réponse pour la quasi-totalité des visites (pas de
 * paramètre dans l'URL), et un éventuel `?filter=` la resserre à
 * l'hydratation.
 */
export default function TravauxContent({ projets }: Props) {
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const f = new URLSearchParams(window.location.search).get('filter')
    if (f && FILTRES.includes(f)) setActiveFilter(f)
  }, [])

  const filtered =
    activeFilter === 'all'
      ? projets
      : projets.filter((p) =>
          p.category === activeFilter || p.category.split('-').includes(activeFilter)
        )

  function handleFilter(f: string) {
    setActiveFilter(f)

    /* L'URL suit, pour qu'une sélection reste partageable et survive au
       rechargement. `replaceState` plutôt que le routeur : rien à recharger,
       et ça n'empile pas une entrée d'historique par clic de filtre. */
    const params = new URLSearchParams(window.location.search)
    if (f === 'all') params.delete('filter')
    else params.set('filter', f)
    const qs = params.toString()
    window.history.replaceState(null, '', qs ? `${window.location.pathname}?${qs}` : window.location.pathname)
  }

  return (
    <>
      <TravauxHeader
        activeFilter={activeFilter}
        count={filtered.length}
        onFilter={handleFilter}
      />
      <ProjetGrid projets={filtered} />
    </>
  )
}
