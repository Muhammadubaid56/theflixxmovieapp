import { fetchAPIData, TVShow } from '@/lib/tmdb'
import MovieCard from '@/components/MovieCard'

export const dynamic = 'force-dynamic'

export default async function ShowsPage() {
  const popularShows = await fetchAPIData<{ results: TVShow[] }>('tv/popular')

  return (
    <section className="container mx-auto px-5 mb-16 mt-12">
      <div className="flex items-center justify-center mb-12">
        <div className="text-center">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-secondary via-yellow-400 to-secondary bg-clip-text text-transparent">
            Popular TV Shows
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {popularShows.results.map((show) => (
          <MovieCard key={show.id} item={show} type="tv" />
        ))}
      </div>
    </section>
  )
}

