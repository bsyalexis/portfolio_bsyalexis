interface Visual {
  layout: string
  images: string[]
}

interface Props {
  visual: Visual
  dark?:  boolean
}

/* Gradients placeholder (utilisés jusqu'à ce que les vraies images soient disponibles) */
const GRAD = [
  'linear-gradient(160deg, #b5aea6 0%, #7a7470 100%)',
  'linear-gradient(160deg, #c2b8a8 0%, #9a8f82 100%)',
  'linear-gradient(160deg, #a8a09a 0%, #706860 100%)',
]

function ImgBlock({ src, grad }: { src: string; grad: string }) {
  return (
    <div
      style={{
        width:                '100%',
        height:               '100%',
        background:           `url(${src}) center/cover no-repeat, ${grad}`,
        backgroundSize:       'cover',
        backgroundPosition:   'center',
      }}
    />
  )
}

export default function VisualBlock({ visual }: Props) {
  const { layout, images } = visual

  /* ── FULL ──────────────────────────── */
  if (layout === 'full') {
    return (
      <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
        <ImgBlock src={images[0] ?? ''} grad={GRAD[0]} />
      </div>
    )
  }

  /* ── SPLIT EQUAL 50/50 ─────────────── */
  if (layout === 'split-equal') {
    return (
      <div
        style={{
          display:               'grid',
          gridTemplateColumns:   '1fr 1fr',
          gap:                   '3px',
          height:                '55vh',
          minHeight:             '300px',
          overflow:              'hidden',
        }}
      >
        {[0, 1].map((i) => (
          <ImgBlock key={i} src={images[i] ?? ''} grad={GRAD[i % GRAD.length]} />
        ))}
      </div>
    )
  }

  /* ── SPLIT ASYMMETRIC 40/60 ────────── */
  if (layout === 'split-asymmetric') {
    return (
      <div
        style={{
          display:               'grid',
          gridTemplateColumns:   '2fr 3fr',
          gap:                   '3px',
          height:                '65vh',
          minHeight:             '360px',
          overflow:              'hidden',
        }}
      >
        {[0, 1].map((i) => (
          <ImgBlock key={i} src={images[i] ?? ''} grad={GRAD[i % GRAD.length]} />
        ))}
      </div>
    )
  }

  return null
}
