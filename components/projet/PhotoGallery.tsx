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

// Row pattern that repeats: 3-equal, wide-left(2+1), wide-right(1+2), 3-equal
type RowType = 'THREE' | 'WIDE_LEFT' | 'WIDE_RIGHT'
const ROW_CYCLE: RowType[] = ['THREE', 'WIDE_LEFT', 'WIDE_RIGHT', 'THREE']
const ROW_HEIGHTS: Record<RowType, number> = { THREE: 320, WIDE_LEFT: 440, WIDE_RIGHT: 380 }

function buildRows(images: string[]): Array<{ type: RowType; imgs: string[] }> {
  const rows: Array<{ type: RowType; imgs: string[] }> = []
  let i = 0
  let cycleIdx = 0
  while (i < images.length) {
    const type = ROW_CYCLE[cycleIdx % ROW_CYCLE.length]
    const size = type === 'THREE' ? 3 : 2
    rows.push({ type, imgs: images.slice(i, i + size) })
    i += size
    cycleIdx++
  }
  return rows
}

export default function PhotoGallery({
  title, client, year, category, galleryText = '', galleryImages = [],
}: Props) {
  const [lbIndex, setLbIndex] = useState<number | null>(null)

  const openLb = useCallback((i: number) => setLbIndex(i), [])
  const closeLb = useCallback(() => setLbIndex(null), [])
  const prevLb = useCallback(() => setLbIndex((i) => i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null), [galleryImages.length])
  const nextLb = useCallback(() => setLbIndex((i) => i !== null ? (i + 1) % galleryImages.length : null), [galleryImages.length])

  const cell = (globalIdx: number, style: React.CSSProperties) => (
    <div
      key={globalIdx}
      className="gallery-clickable"
      onClick={() => openLb(globalIdx)}
      style={{
        ...style,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        background: galleryImages[globalIdx] ? undefined : placeholders[globalIdx % placeholders.length],
      }}
    >
      {galleryImages[globalIdx] && (
        <img
          src={galleryImages[globalIdx]}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
    </div>
  )

  // First image goes in the hero row (with text card)
  const heroImg = galleryImages[0]
  const rest = galleryImages.slice(1)
  const rows = buildRows(rest)

  return (
    <>
      {/* ── Hero row : text card + first image ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px', width: '100%', height: '520px' }}>
        {/* Text card */}
        <div style={styles.textCard}>
          <div style={styles.accentLine} />
          <div style={styles.textTop}>
            <span style={styles.pill}>{categoryLabel[category] ?? category}&ensp;·&ensp;{year}</span>
            <h2 style={styles.title}>{title}</h2>
            {galleryText && <p style={styles.body}>{galleryText}</p>}
          </div>
          <p style={styles.clientLabel}>{client}</p>
        </div>
        {/* First image — spans 2 cols */}
        <div
          className="gallery-clickable"
          onClick={() => openLb(0)}
          style={{ gridColumn: '2 / 4', position: 'relative', overflow: 'hidden', cursor: 'pointer', background: heroImg ? undefined : placeholders[0] }}
        >
          {heroImg && (
            <img src={heroImg} alt="" loading="lazy" decoding="async"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
        </div>
      </div>

      {/* ── Dynamic rows for remaining images ── */}
      {rows.map((row, rowIdx) => {
        const startIdx = 1 + rowIdx * 0 // computed below
        // compute actual global start index for this row
        let globalStart = 1
        for (let r = 0; r < rowIdx; r++) {
          globalStart += rows[r].imgs.length
        }
        const h = ROW_HEIGHTS[row.type]

        if (row.type === 'THREE') {
          return (
            <div key={rowIdx} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px', width: '100%', height: `${h}px`, marginTop: '3px' }}>
              {row.imgs.map((_, j) => cell(globalStart + j, { height: '100%' }))}
              {/* fill empty slots if less than 3 */}
              {row.imgs.length < 3 && Array.from({ length: 3 - row.imgs.length }).map((_, j) => (
                <div key={`empty-${j}`} style={{ background: 'var(--bg)', height: '100%' }} />
              ))}
            </div>
          )
        }

        if (row.type === 'WIDE_LEFT') {
          return (
            <div key={rowIdx} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px', width: '100%', height: `${h}px`, marginTop: '3px' }}>
              {cell(globalStart, { gridColumn: '1 / 3', height: '100%' })}
              {row.imgs[1] !== undefined ? cell(globalStart + 1, { gridColumn: '3', height: '100%' }) : <div style={{ background: 'var(--bg)' }} />}
            </div>
          )
        }

        // WIDE_RIGHT
        return (
          <div key={rowIdx} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px', width: '100%', height: `${h}px`, marginTop: '3px' }}>
            {cell(globalStart, { gridColumn: '1', height: '100%' })}
            {row.imgs[1] !== undefined ? cell(globalStart + 1, { gridColumn: '2 / 4', height: '100%' }) : <div style={{ background: 'var(--bg)' }} />}
          </div>
        )
      })}

      {lbIndex !== null && galleryImages.length > 0 && (
        <Lightbox images={galleryImages} index={lbIndex} onClose={closeLb} onPrev={prevLb} onNext={nextLb} />
      )}
    </>
  )
}

const styles: Record<string, React.CSSProperties> = {
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
    height:         '100%',
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
