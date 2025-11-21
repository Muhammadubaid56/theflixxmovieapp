import { MetadataRoute } from 'next'
import { getMovieGenres, getTVGenres } from '@/lib/tmdb'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flixx.vercel.app'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/shows`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Dynamic genre pages
  try {
    const movieGenres = await getMovieGenres()
    const tvGenres = await getTVGenres()
    
    const genrePages: MetadataRoute.Sitemap = [
      ...movieGenres.map((genre) => ({
        url: `${baseUrl}/categories/movies/${genre.id}?name=${encodeURIComponent(genre.name)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })),
      ...tvGenres.map((genre) => ({
        url: `${baseUrl}/categories/tv/${genre.id}?name=${encodeURIComponent(genre.name)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })),
    ]

    return [...staticPages, ...genrePages]
  } catch (error) {
    // If API fails, return at least static pages
    return staticPages
  }
}

