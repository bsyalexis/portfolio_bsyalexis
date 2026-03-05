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
  title: {
    default: 'Alexis Bossy — Directeur Artistique',
    template: '%s — Alexis Bossy',
  },
  description:
    'Directeur Artistique, Vidéaste & Photographe freelance. Films de marque, photographie corporate, design — basé en France.',
  keywords: ['directeur artistique', 'vidéaste', 'photographe', 'freelance', 'portfolio'],
  authors: [{ name: 'Alexis Bossy' }],
  openGraph: {
    title: 'Alexis Bossy — Directeur Artistique',
    description: 'Films de marque, photographie corporate, design.',
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
