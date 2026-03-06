import type { Metadata } from 'next'
import type { Viewport } from 'next'
import { Inter, Oswald } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dirtydawgzovencleaning.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dirty Dawgz Oven Cleaning LLC | Michigan's Premier Commercial Cleaning",
  description:
    "Michigan's premier commercial kitchen cleaning company. Got a dirty oven? Call the Dirty Dawgz! Professional conveyor oven cleaning, grease trap cleaning, and hood vent cleaning across all of Michigan.",
  openGraph: {
    title: "Dirty Dawgz Oven Cleaning LLC | Michigan's Premier Commercial Cleaning",
    description:
      "Michigan's premier commercial kitchen cleaning company. Professional conveyor oven cleaning, grease trap cleaning, and hood vent cleaning across Michigan.",
    url: siteUrl,
    siteName: "Dirty Dawgz Oven Cleaning LLC",
    images: [
      {
        url: '/images/dirty_dawgz_preview_1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Dirty Dawgz Oven Cleaning LLC',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dirty Dawgz Oven Cleaning LLC | Michigan's Premier Commercial Cleaning",
    description:
      "Michigan's premier commercial kitchen cleaning company. Professional conveyor oven cleaning, grease trap cleaning, and hood vent cleaning across Michigan.",
    images: ['/images/dirty_dawgz_preview_1200x630.png'],
  },
  keywords: [
    'oven cleaning Michigan',
    'commercial oven cleaning',
    'conveyor oven cleaning',
    'grease trap cleaning Michigan',
    'hood vent cleaning Michigan',
    'restaurant cleaning Michigan',
    'Michigan commercial cleaning',
    'commercial kitchen cleaning',
  ],
  icons: {
    icon: [
      {
        url: '/dirty_dawgz_favicon_180x180.png',
        type: 'image/png',
        sizes: '180x180',
      },
    ],
    apple: [
      {
        url: '/dirty_dawgz_favicon_180x180.png',
        type: 'image/png',
        sizes: '180x180',
      },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
