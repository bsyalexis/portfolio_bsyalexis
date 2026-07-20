import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Nav from '@/components/layout/Nav'
import LenisProvider from '@/components/layout/LenisProvider'
import ScrollProgress from '@/components/layout/ScrollProgress'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  icons: {
    icon: '/avatar.png',
    apple: '/avatar.png',
  },
  title: {
    default: 'Alexis Bossy ı Photographe & Vidéaste',
    template: '%s ı Alexis Bossy',
  },
  description:
    'Photographe et vidéaste à Saint-Étienne, également directeur artistique. Je crée du contenu photo et vidéo pour les clubs, les sportifs et les indépendants locaux qui reflète vraiment ce qu\'ils font.',
  keywords: ['photographe', 'vidéaste', 'photo', 'vidéo', 'directeur artistique', 'freelance', 'portfolio', 'sport', 'clubs', 'Saint-Étienne', 'Lyon'],
  authors: [{ name: 'Alexis Bossy' }],
  openGraph: {
    title: 'Alexis Bossy ı Photographe & Vidéaste',
    description: 'Photographe et vidéaste, également directeur artistique. Je crée du contenu photo et vidéo pour les clubs, les sportifs et les indépendants locaux qui reflète vraiment ce qu\'ils font.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // suppressHydrationWarning : le script ci-dessous ajoute la classe `js`
    // avant l'hydratation, donc le className du client diffère forcément de
    // celui du serveur. Sans ça React avertit à chaque rendu — et surtout il
    // réaligne l'attribut sur la version serveur, ce qui efface `js` et
    // désactive silencieusement toutes les révélations.
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Marque la page comme « JavaScript actif », avant le premier paint.
            Les états cachés des révélations sont conditionnés à cette classe :
            sans JS elle n'est jamais posée, donc rien ne se cache et la page
            reste entièrement lisible au lieu d'apparaître vide. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className={inter.className}>
        <ScrollProgress />
        <LenisProvider>
          <Nav />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
