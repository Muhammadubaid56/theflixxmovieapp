import { fetchAPIData, Movie } from '@/lib/tmdb'
import MovieCard from '@/components/MovieCard'
import NowPlayingSlider from '@/components/NowPlayingSlider'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const nowPlaying = await fetchAPIData<{ results: Movie[] }>('movie/now_playing')
  const popularMovies = await fetchAPIData<{ results: Movie[] }>('movie/popular')

  return (
    <>
      {/* Search Section */}
      <section className="py-20 px-5 mb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent"></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black mb-3 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Discover Your Next Favorite
            </h2>
            <p className="text-gray-400 text-lg">Search through thousands of movies and TV shows</p>
          </div>
          <form action="/search" method="GET" className="w-full">
            <div className="flex justify-center gap-6 mb-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="type"
                  value="movie"
                  defaultChecked
                  className="w-5 h-5 cursor-pointer accent-secondary"
                />
                <span className="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors">Movies</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="type"
                  value="tv"
                  className="w-5 h-5 cursor-pointer accent-secondary"
                />
                <span className="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors">TV Shows</span>
              </label>
            </div>
            <div className="flex gap-3 bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10 shadow-2xl">
              <input
                type="text"
                name="query"
                id="search-term"
                placeholder="Search for movies, TV shows..."
                className="flex-1 h-14 px-6 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
                required
              />
              <button
                type="submit"
                className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-r from-secondary to-yellow-400 text-black font-bold cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-secondary/50 flex items-center justify-center"
              >
                <i className="fas fa-search text-xl"></i>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Now Playing Section */}
      <NowPlayingSlider movies={nowPlaying.results.slice(0, 10)} />

      {/* Popular Movies */}
      <section className="container mx-auto px-5 mb-16">
        <div className="flex items-center justify-center mb-12">
          <div className="text-center">
            <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-secondary via-yellow-400 to-secondary bg-clip-text text-transparent">
              Popular Movies
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {popularMovies.results.map((movie) => (
            <MovieCard key={movie.id} item={movie} type="movie" />
          ))}
        </div>
      </section>
    </>
  )
}
