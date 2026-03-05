interface Props {
  gradient?: string
  label?: string
}

const defaultGradient = 'linear-gradient(160deg, #c8c0b6 0%, #a09288 100%)'

export default function ImagePlaceholder({ gradient, label }: Props) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: gradient ?? defaultGradient,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '14px',
      }}
    >
      {label && (
        <span
          style={{
            fontSize: '0.58rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
