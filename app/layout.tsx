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
    default: 'Alexis Bossy — Photographe & Vidéaste',
    template: '%s — Alexis Bossy',
  },
  description:
    'Photographe & Vidéaste freelance. Films de marque, photographie corporate — basé en France.',
  keywords: ['photographe', 'vidéaste', 'freelance', 'portfolio', 'films de marque'],
  authors: [{ name: 'Alexis Bossy' }],
  openGraph: {
    title: 'Alexis Bossy — Photographe & Vidéaste',
    description: 'Films de marque et photographie corporate.',
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
