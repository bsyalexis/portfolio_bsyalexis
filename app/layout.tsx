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
    'Photographe & Vidéaste ı Je crée du contenu photo et vidéo pour les clubs, les sportifs et les indépendants locaux qui reflète vraiment ce qu\'ils font.',
  keywords: ['photographe', 'vidéaste', 'freelance', 'portfolio', 'sport', 'clubs', 'Saint-Étienne', 'Lyon'],
  authors: [{ name: 'Alexis Bossy' }],
  openGraph: {
    title: 'Alexis Bossy ı Photographe & Vidéaste',
    description: 'Je crée du contenu photo et vidéo pour les clubs, les sportifs et les indépendants locaux qui reflète vraiment ce qu\'ils font.',
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
    <html lang="fr" className={inter.variable}>
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
