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
  title: 'Dirty Dawgz Oven Cleaning | Commercial Oven, Hood & Grease Trap Cleaning Michigan',
  description:
    "Dirty Dawgz provides professional commercial oven cleaning, hood cleaning, and grease trap cleaning for restaurants across Michigan. Reliable kitchen exhaust cleaning for pizza shops and commercial kitchens.",
  openGraph: {
    title: 'Dirty Dawgz Oven Cleaning',
    description: "Michigan's Premier Commercial Oven, Hood & Grease Trap Cleaning Service",
    url: siteUrl,
    siteName: 'Dirty Dawgz Oven Cleaning',
    images: [
      {
        url: '/images/dirty_dawgz_preview_1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Dirty Dawgz Oven Cleaning',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dirty Dawgz Oven Cleaning',
    description: "Michigan's Premier Commercial Oven, Hood & Grease Trap Cleaning Service",
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
      { url: '/images/favicon-48.png', type: 'image/png', sizes: '48x48' },
      { url: '/images/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/images/favicon-16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [
      { url: '/dirty_dawgz_favicon_180x180.png', type: 'image/png', sizes: '180x180' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Dirty Dawgz Oven Cleaning',
  image: `${siteUrl}/images/logo.png`,
  url: siteUrl,
  telephone: '+1-269-248-1209',
  areaServed: 'Michigan',
  description:
    'Commercial oven cleaning, hood cleaning, and grease trap cleaning for restaurants and commercial kitchens.',
  serviceType: [
    'Commercial Oven Cleaning',
    'Kitchen Hood Cleaning',
    'Grease Trap Cleaning',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
