import Image from 'next/image'
import Link from 'next/link'
import { fetchAPIData, TVShow, getImageUrl } from '@/lib/tmdb'
import { notFound } from 'next/navigation'

interface TVShowDetailsPageProps {
  params: {
    id: string
  }
}

export default async function TVShowDetailsPage({ params }: TVShowDetailsPageProps) {
  let show: TVShow
  try {
    show = await fetchAPIData<TVShow>(`tv/${params.id}`)
  } catch (error) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <section className="container mx-auto px-5 mb-10 mt-10">
      <div className="mb-8">
        <Link href="/shows" className="btn">
          Back To TV Shows
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-16 mb-8">
        <div className="flex-shrink-0">
          <Image
            src={getImageUrl(show.poster_path, 'w500')}
            alt={show.name}
            width={400}
            height={600}
            className="w-full max-w-[400px] h-auto object-cover"
            unoptimized
          />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">{show.name}</h2>
          <p className="mb-4 flex items-center gap-2">
            <i className="fas fa-star text-secondary"></i>
            {show.vote_average.toFixed(1)} / 10
          </p>
          <p className="text-gray-400 mb-4">
            First Air Date: {show.first_air_date ? formatDate(show.first_air_date) : 'N/A'}
          </p>
          <p className="mb-6 leading-relaxed">{show.overview}</p>
          
          {show.genres && show.genres.length > 0 && (
            <>
              <h5 className="text-xl font-semibold mb-3">Genres</h5>
              <ul className="flex flex-wrap gap-2 mb-6">
                {show.genres.map((genre) => (
                  <li
                    key={genre.id}
                    className="px-3 py-1 bg-secondary/20 border border-secondary rounded text-secondary"
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            </>
          )}

          {show.homepage && (
            <a
              href={show.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-block"
            >
              Visit Show Homepage
            </a>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 pt-8">
        <h2 className="text-2xl font-bold mb-6">Show Info</h2>
        <ul className="space-y-4">
          {show.number_of_episodes !== undefined && (
            <li className="pb-2 border-b border-white/10">
              <span className="text-secondary">Number Of Episodes:</span>{' '}
              {show.number_of_episodes}
            </li>
          )}
          {show.number_of_seasons !== undefined && (
            <li className="pb-2 border-b border-white/10">
              <span className="text-secondary">Number Of Seasons:</span>{' '}
              {show.number_of_seasons}
            </li>
          )}
          {show.last_episode_to_air && (
            <li className="pb-2 border-b border-white/10">
              <span className="text-secondary">Last Episode To Air:</span>{' '}
              {show.last_episode_to_air.name} ({show.last_episode_to_air.air_date ? formatDate(show.last_episode_to_air.air_date) : 'N/A'})
            </li>
          )}
          {show.status && (
            <li className="pb-2 border-b border-white/10">
              <span className="text-secondary">Status:</span> {show.status}
            </li>
          )}
        </ul>

        {show.production_companies && show.production_companies.length > 0 && (
          <>
            <h4 className="text-xl font-semibold mt-8 mb-4">Production Companies</h4>
            <div className="flex flex-wrap gap-3">
              {show.production_companies.map((company) => (
                <span
                  key={company.id}
                  className="px-3 py-1 bg-white/10 rounded text-sm"
                >
                  {company.name}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

