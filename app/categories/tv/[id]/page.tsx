import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { discoverTVByGenre, getTVGenres, APIResponse, TVShow } from '@/lib/tmdb'
import MovieCard from '@/components/MovieCard'
import GenrePagination from '@/components/GenrePagination'
import { generateMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'

interface GenreTVPageProps {
  params: {
    id: string
  }
  searchParams: {
    name?: string
    page?: string
  }
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params, searchParams }: GenreTVPageProps): Promise<Metadata> {
  const genreName = searchParams.name || 'TV Shows'
  
  return generateMetadata({
    title: `${genreName} TV Shows - Browse ${genreName} Series`,
    description: `Browse and discover ${genreName.toLowerCase()} TV shows. Find the best ${genreName.toLowerCase()} series, watch episodes, and explore popular ${genreName.toLowerCase()} television.`,
    keywords: [`${genreName} TV shows`, `${genreName} series`, 'TV shows', 'TV series', 'television', genreName.toLowerCase()],
    url: `/categories/tv/${params.id}?name=${encodeURIComponent(genreName)}`,
  })
}

export default async function GenreTVPage({ params, searchParams }: GenreTVPageProps) {
  const genreId = parseInt(params.id)
  const genreName = searchParams.name || 'TV Shows'
  const page = parseInt(searchParams.page || '1')

  // Validate genre ID
  const tvGenres = await getTVGenres()
  const genre = tvGenres.find(g => g.id === genreId)
  
  if (!genre) {
    notFound()
  }

  let shows: APIResponse<TVShow>
  try {
    shows = await discoverTVByGenre(genreId, page)
  } catch (error) {
    notFound()
  }

  return (
    <section className="container mx-auto px-5 mb-16 mt-12">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <a
            href="/categories"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-secondary transition-colors group"
          >
            <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
            <span className="font-semibold">Back to Categories</span>
          </a>
        </div>
        <h1 className="text-4xl lg:text-5xl font-black mb-2 bg-gradient-to-r from-secondary via-yellow-400 to-secondary bg-clip-text text-transparent">
          {genreName} TV Shows
        </h1>
        <p className="text-gray-400 text-lg">
          Found <span className="text-secondary font-bold">{shows.total_results}</span> TV shows
        </p>
      </div>

      {shows.results.length === 0 ? (
        <div className="text-center py-20 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10">
          <i className="fas fa-tv text-6xl text-gray-600 mb-4"></i>
          <p className="text-2xl text-gray-400 font-semibold">No TV shows found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-8">
            {shows.results.map((show) => (
              <MovieCard key={show.id} item={show} type="tv" />
            ))}
          </div>

          {shows.total_pages > 1 && (
            <GenrePagination
              currentPage={page}
              totalPages={shows.total_pages}
              genreId={genreId}
              genreName={genreName}
              type="tv"
            />
          )}
        </>
      )}
    </section>
  )
}

