import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { discoverMoviesByGenre, getMovieGenres, APIResponse, Movie } from '@/lib/tmdb'
import MovieCard from '@/components/MovieCard'
import GenrePagination from '@/components/GenrePagination'

interface GenreMoviesPageProps {
  params: {
    id: string
  }
  searchParams: {
    name?: string
    page?: string
  }
}

export const dynamic = 'force-dynamic'

export default async function GenreMoviesPage({ params, searchParams }: GenreMoviesPageProps) {
  const genreId = parseInt(params.id)
  const genreName = searchParams.name || 'Movies'
  const page = parseInt(searchParams.page || '1')

  // Validate genre ID
  const movieGenres = await getMovieGenres()
  const genre = movieGenres.find(g => g.id === genreId)
  
  if (!genre) {
    notFound()
  }

  let movies: APIResponse<Movie>
  try {
    movies = await discoverMoviesByGenre(genreId, page)
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
          {genreName} Movies
        </h1>
        <p className="text-gray-400 text-lg">
          Found <span className="text-secondary font-bold">{movies.total_results}</span> movies
        </p>
      </div>

      {movies.results.length === 0 ? (
        <div className="text-center py-20 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10">
          <i className="fas fa-film text-6xl text-gray-600 mb-4"></i>
          <p className="text-2xl text-gray-400 font-semibold">No movies found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-8">
            {movies.results.map((movie) => (
              <MovieCard key={movie.id} item={movie} type="movie" />
            ))}
          </div>

          {movies.total_pages > 1 && (
            <GenrePagination
              currentPage={page}
              totalPages={movies.total_pages}
              genreId={genreId}
              genreName={genreName}
              type="movies"
            />
          )}
        </>
      )}
    </section>
  )
}

