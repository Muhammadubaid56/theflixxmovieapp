import { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flixx.vercel.app'
const siteName = 'Flixx'
const defaultDescription = 'Discover and stream your favorite movies and TV shows. Browse by genre, search, and explore thousands of titles with Flixx - your ultimate entertainment destination.'

export function generateMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
}: {
  title: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'movie' | 'tv_show'
}): Metadata {
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`
  const metaDescription = description || defaultDescription
  const metaKeywords = keywords?.join(', ') || 'movies, TV shows, streaming, entertainment, watch online, movie database, TV series, films, cinema'
  const imageUrl = image || `${siteUrl}/images/showcase-bg.jpg`
  const pageUrl = url ? `${siteUrl}${url}` : siteUrl

  return {
    title: fullTitle,
    description: metaDescription,
    keywords: metaKeywords,
    authors: [{ name: 'Muhammad Ubaid', url: 'https://github.com/Muhammadubaid56' }],
    creator: 'Muhammad Ubaid',
    publisher: 'Flixx',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: type === 'movie' || type === 'tv_show' ? 'video.movie' : 'website',
      url: pageUrl,
      title: fullTitle,
      description: metaDescription,
      siteName: siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      images: [imageUrl],
      creator: '@Muhammadubaid56',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add your verification codes here if needed
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
    },
  }
}

export function generateStructuredData({
  type,
  title,
  description,
  image,
  url,
  datePublished,
  dateModified,
  rating,
  genre,
}: {
  type: 'Movie' | 'TVSeries' | 'WebSite' | 'BreadcrumbList' | 'CollectionPage'
  title: string
  description?: string
  image?: string
  url?: string
  datePublished?: string
  dateModified?: string
  rating?: number
  genre?: string[]
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flixx.vercel.app'
  const pageUrl = url ? `${baseUrl}${url}` : baseUrl
  const imageUrl = image || `${baseUrl}/images/showcase-bg.jpg`

  const baseStructuredData: any = {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description: description || defaultDescription,
    image: imageUrl,
    url: pageUrl,
  }

  if (type === 'Movie' || type === 'TVSeries') {
    baseStructuredData.aggregateRating = rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: rating,
          bestRating: '10',
          worstRating: '1',
        }
      : undefined
    baseStructuredData.genre = genre || []
    baseStructuredData.datePublished = datePublished
    baseStructuredData.dateModified = dateModified || datePublished
  }

  if (type === 'WebSite') {
    baseStructuredData.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?query={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    }
  }

  return baseStructuredData
}

