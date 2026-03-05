'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import TravauxHeader from './TravauxHeader'
import ProjetGrid    from './ProjetGrid'

interface Projet {
  slug:     string
  title:    string
  client:   string
  category: string
  year:     string
  ratio?:   string
  cover?:   string
  featured?: boolean
}

interface Props {
  projets: Projet[]
}

/* ─── Composant interne — utilise useSearchParams ─── */
function TravauxInner({ projets }: Props) {
  const searchParams  = useSearchParams()
  const router        = useRouter()
  const pathname      = usePathname()

  const activeFilter = searchParams.get('filter') ?? 'all'

  const filtered =
    activeFilter === 'all'
      ? projets
      : projets.filter((p) => p.category === activeFilter)

  function handleFilter(f: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (f === 'all') {
      params.delete('filter')
    } else {
      params.set('filter', f)
    }
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
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

/* ─── Wrapper avec Suspense (requis pour useSearchParams en Next 14) ─── */
export default function TravauxContent({ projets }: Props) {
  return (
    <Suspense fallback={<div style={{ height: '60vh' }} />}>
      <TravauxInner projets={projets} />
    </Suspense>
  )
}
