'use client'

import React, { useState, useCallback } from 'react'
import Lightbox from './Lightbox'

interface Props {
  title:         string
  client:        string
  year:          string
  category:      string
  galleryText?:  string
  galleryImages?: string[]
}

const placeholders = [
  'linear-gradient(155deg, #d8d3cc 0%, #b0a9a2 100%)',
  'linear-gradient(155deg, #cfc9c1 0%, #a8a19a 100%)',
  'linear-gradient(155deg, #c6bfb7 0%, #a09890 100%)',
  'linear-gradient(155deg, #bdb6ae 0%, #979088 100%)',
  'linear-gradient(155deg, #b4ada5 0%, #8e8880 100%)',
  'linear-gradient(155deg, #aaa39b 0%, #857f78 100%)',
  'linear-gradient(155deg, #a09991 0%, #7c7670 100%)',
  'linear-gradient(155deg, #979089 0%, #736d67 100%)',
]

const categoryLabel: Record<string, string> = {
  photo:  'Photographie',
  video:  'Vidéo',
  autres: 'Direction Artistique',
}

export default function PhotoGallery({
  title, client, year, category, galleryText = '', galleryImages = [],
}: Props) {
  const [lbIndex, setLbIndex] = useState<number | null>(null)

  const openLb = useCallback((i: number) => setLbIndex(i), [])
  const closeLb = useCallback(() => setLbIndex(null), [])
  const prevLb = useCallback(() => setLbIndex((i) => i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null), [galleryImages.length])
  const nextLb = useCallback(() => setLbIndex((i) => i !== null ? (i + 1) % galleryImages.length : null), [galleryImages.length])

  const clickableCell = (i: number, extraStyle: React.CSSProperties) => (
    <div
      className="gallery-clickable"
      onClick={() => openLb(i)}
      style={{
        ...styles.cell,
        ...extraStyle,
        position: 'relative',
        overflow: 'hidden',
        background: galleryImages[i] ? undefined : placeholders[i % placeholders.length],
      }}
    >
      {galleryImages[i] && (
        <img
          src={galleryImages[i]}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
    </div>
  )

  return (
    <>
      <div style={styles.grid}>

        {/* ── Ligne 1 : encart texte + grande photo ── */}
        <div style={styles.textCard}>
          <div style={styles.accentLine} />
          <div style={styles.textTop}>
            <span style={styles.pill}>{categoryLabel[category] ?? category}&ensp;·&ensp;{year}</span>
            <h2 style={styles.title}>{title}</h2>
            {galleryText && (
              <p style={styles.body}>{galleryText}</p>
            )}
          </div>
          <p style={styles.clientLabel}>{client}</p>
        </div>

        {clickableCell(0, { gridColumn: '2 / 4', gridRow: '1' })}

        {/* ── Ligne 2 : 3 photos égales ── */}
        {clickableCell(1, { gridColumn: '1', gridRow: '2' })}
        {clickableCell(2, { gridColumn: '2', gridRow: '2' })}
        {clickableCell(3, { gridColumn: '3', gridRow: '2' })}

        {/* ── Ligne 3 : 2 cols + 1 col ── */}
        {clickableCell(4, { gridColumn: '1 / 3', gridRow: '3' })}
        {clickableCell(5, { gridColumn: '3',     gridRow: '3' })}

        {/* ── Ligne 4 : 1 col + 2 cols ── */}
        {clickableCell(6, { gridColumn: '1',     gridRow: '4' })}
        {clickableCell(7, { gridColumn: '2 / 4', gridRow: '4' })}

        {/* ── Ligne 5 : 3 photos égales ── */}
        {clickableCell(8,  { gridColumn: '1', gridRow: '5' })}
        {clickableCell(9,  { gridColumn: '2', gridRow: '5' })}
        {clickableCell(10, { gridColumn: '3', gridRow: '5' })}

      </div>

      {lbIndex !== null && galleryImages.length > 0 && (
        <Lightbox images={galleryImages} index={lbIndex} onClose={closeLb} onPrev={prevLb} onNext={nextLb} />
      )}
    </>
  )
}

const styles: Record<string, React.CSSProperties> = {
  grid: {
    display:             'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows:    '520px 320px 440px 380px 320px',
    gap:                 '3px',
    width:               '100%',
  },
  cell: {
    overflow: 'hidden',
  },
  textCard: {
    gridColumn:     '1',
    gridRow:        '1',
    background:     'var(--bg)',
    padding:        '52px 48px',
    display:        'flex',
    flexDirection:  'column',
    justifyContent: 'space-between',
    position:       'relative',
    overflow:       'hidden',
  },
  accentLine: {
    position:   'absolute',
    top:        0,
    left:       0,
    right:      0,
    height:     '3px',
    background: 'var(--accent)',
  },
  textTop: {
    display:       'flex',
    flexDirection: 'column',
    gap:           '20px',
  },
  pill: {
    display:       'inline-block',
    fontSize:      '0.65rem',
    fontWeight:    600,
    letterSpacing: '0.12em',
    color:         'var(--accent)',
    textTransform: 'uppercase',
  },
  title: {
    fontSize:      'clamp(2rem, 3vw, 3rem)',
    fontWeight:    300,
    letterSpacing: '-0.025em',
    lineHeight:    1.1,
    color:         'var(--text)',
    margin:        0,
  },
  body: {
    fontSize:   '0.92rem',
    fontWeight: 300,
    lineHeight: 1.8,
    color:      'var(--text-mid)',
    margin:     0,
    maxWidth:   '340px',
  },
  clientLabel: {
    fontSize:      '0.72rem',
    fontWeight:    500,
    letterSpacing: '0.08em',
    color:         'var(--text-dim)',
    margin:        0,
    textTransform: 'uppercase',
  },
}
