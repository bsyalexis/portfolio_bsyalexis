import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Backgrounds */
        bg:       'var(--bg)',
        'bg-card': 'var(--bg-card)',

        /* Texte */
        text:     'var(--text)',
        'text-mid': 'var(--text-mid)',
        'text-dim': 'var(--text-dim)',

        /* Accent */
        accent:   'var(--accent)',
        'accent-d': 'var(--accent-d)',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero':    ['clamp(3.8rem, 8vw, 7rem)', { lineHeight: '1.05', fontWeight: '300' }],
        'section': ['2.2rem', { lineHeight: '1.2', fontWeight: '300' }],
        'label':   ['0.6rem', { lineHeight: '1', letterSpacing: '0.12em' }],
      },
      borderRadius: {
        card:    '20px',
        'card-sm': '18px',
        pill:    '100px',
      },
      boxShadow: {
        'card':    '0 1px 20px rgba(0,0,0,0.06)',
        'card-h':  '0 4px 32px rgba(0,0,0,0.10)',
      },
      maxWidth: {
        container: '1100px',
        grid:      '1200px',
      },
    },
  },
  plugins: [],
}

export default config
