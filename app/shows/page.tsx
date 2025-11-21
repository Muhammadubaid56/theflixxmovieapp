import { fetchAPIData, TVShow } from '@/lib/tmdb'
import MovieCard from '@/components/MovieCard'

export const dynamic = 'force-dynamic'

export default async function ShowsPage() {
  const popularShows = await fetchAPIData<{ results: TVShow[] }>('tv/popular')

  return (
    <section className="container mx-auto px-5 mb-10 mt-10">
      <h2 className="my-5 text-center uppercase text-2xl font-bold mb-8">
        Popular TV Shows
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {popularShows.results.map((show) => (
          <MovieCard key={show.id} item={show} type="tv" />
        ))}
      </div>
    </section>
  )
}

