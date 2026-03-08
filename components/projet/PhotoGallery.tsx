'use client'

import React from 'react'

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

  const img = (i: number): React.CSSProperties => ({
    backgroundImage:    galleryImages[i] ? `url(${galleryImages[i]})` : 'none',
    background:         galleryImages[i]
      ? `url(${galleryImages[i]}) center/cover no-repeat`
      : placeholders[i % placeholders.length],
    backgroundSize:     'cover',
    backgroundPosition: 'center',
  })

  return (
    <div style={styles.grid}>

      {/* ── Ligne 1 : encart texte + grande photo ── */}
      <div style={styles.textCard}>
        {/* Trait cerise */}
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

      {/* Grande photo (cols 2-3) */}
      <div style={{ ...styles.cell, gridColumn: '2 / 4', gridRow: '1', ...img(0) }} />

      {/* ── Ligne 2 : 3 photos égales ── */}
      <div style={{ ...styles.cell, gridColumn: '1', gridRow: '2', ...img(1) }} />
      <div style={{ ...styles.cell, gridColumn: '2', gridRow: '2', ...img(2) }} />
      <div style={{ ...styles.cell, gridColumn: '3', gridRow: '2', ...img(3) }} />

      {/* ── Ligne 3 : 2 cols + 1 col ── */}
      <div style={{ ...styles.cell, gridColumn: '1 / 3', gridRow: '3', ...img(4) }} />
      <div style={{ ...styles.cell, gridColumn: '3',     gridRow: '3', ...img(5) }} />

      {/* ── Ligne 4 : 1 col + 2 cols ── */}
      <div style={{ ...styles.cell, gridColumn: '1',     gridRow: '4', ...img(6) }} />
      <div style={{ ...styles.cell, gridColumn: '2 / 4', gridRow: '4', ...img(7) }} />

      {/* ── Ligne 5 : 3 photos égales ── */}
      <div style={{ ...styles.cell, gridColumn: '1', gridRow: '5', ...img(8)  }} />
      <div style={{ ...styles.cell, gridColumn: '2', gridRow: '5', ...img(9)  }} />
      <div style={{ ...styles.cell, gridColumn: '3', gridRow: '5', ...img(10) }} />

    </div>
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
