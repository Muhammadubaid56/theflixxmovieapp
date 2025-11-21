import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { generateMetadata as genMeta, generateStructuredData } from '@/lib/metadata'

export const metadata: Metadata = genMeta({
  title: 'Flixx - Movie & TV Show Streaming Platform',
  description: 'Discover and stream your favorite movies and TV shows. Browse by genre, search thousands of titles, and explore popular content. Your ultimate entertainment destination.',
  keywords: ['movies', 'TV shows', 'streaming', 'entertainment', 'watch online', 'movie database', 'TV series', 'films', 'cinema', 'browse movies', 'watch TV shows'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = generateStructuredData({
    type: 'WebSite',
    title: 'Flixx - Movie & TV Show Streaming Platform',
    description: 'Discover and stream your favorite movies and TV shows',
  })

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://flixx.vercel.app'} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

