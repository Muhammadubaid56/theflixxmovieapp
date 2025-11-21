import Link from 'next/link'
import { getMovieGenres, getTVGenres } from '@/lib/tmdb'

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
  const movieGenres = await getMovieGenres()
  const tvGenres = await getTVGenres()

  return (
    <section className="container mx-auto px-5 mb-16 mt-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-secondary via-yellow-400 to-secondary bg-clip-text text-transparent">
          Browse by Category
        </h1>
        <p className="text-gray-400 text-lg">Explore movies and TV shows by genre</p>
        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-4"></div>
      </div>

      {/* Movie Genres */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-secondary flex items-center gap-3">
          <i className="fas fa-film"></i>
          Movie Genres
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movieGenres.map((genre) => (
            <Link
              key={genre.id}
              href={`/categories/movies/${genre.id}?name=${encodeURIComponent(genre.name)}`}
              className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-secondary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-3 text-secondary group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-tags"></i>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-secondary transition-colors">
                  {genre.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">Movies</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* TV Show Genres */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-secondary flex items-center gap-3">
          <i className="fas fa-tv"></i>
          TV Show Genres
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tvGenres.map((genre) => (
            <Link
              key={genre.id}
              href={`/categories/tv/${genre.id}?name=${encodeURIComponent(genre.name)}`}
              className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-secondary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-3 text-secondary group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-tags"></i>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-secondary transition-colors">
                  {genre.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">TV Shows</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

