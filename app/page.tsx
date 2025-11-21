import { fetchAPIData, Movie } from '@/lib/tmdb'
import MovieCard from '@/components/MovieCard'
import NowPlayingSlider from '@/components/NowPlayingSlider'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const nowPlaying = await fetchAPIData<{ results: Movie[] }>('movie/now_playing')
  const popularMovies = await fetchAPIData<{ results: Movie[] }>('movie/popular')

  return (
    <>
      {/* Now Playing Section */}
      <NowPlayingSlider movies={nowPlaying.results.slice(0, 10)} />

      {/* Search Section */}
      <section className="py-16 px-5 mb-10">
        <div className="container mx-auto max-w-4xl">
          <form action="/search" method="GET" className="w-full">
            <div className="flex gap-4 mb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="movie"
                  defaultChecked
                  className="cursor-pointer"
                />
                <span>Movies</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="tv"
                  className="cursor-pointer"
                />
                <span>TV Shows</span>
              </label>
            </div>
            <div className="flex gap-2.5">
              <input
                type="text"
                name="query"
                id="search-term"
                placeholder="Enter search term"
                className="flex-1 h-12 px-2.5 border border-white rounded bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
              <button
                type="submit"
                className="flex-shrink-0 w-12 h-12 rounded bg-secondary text-black cursor-pointer transition-all duration-300 hover:bg-transparent hover:text-white flex items-center justify-center"
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Popular Movies */}
      <section className="container mx-auto px-5 mb-10">
        <h2 className="my-5 text-center uppercase text-2xl font-bold mb-8">
          Popular Movies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {popularMovies.results.map((movie) => (
            <MovieCard key={movie.id} item={movie} type="movie" />
          ))}
        </div>
      </section>
    </>
  )
}
