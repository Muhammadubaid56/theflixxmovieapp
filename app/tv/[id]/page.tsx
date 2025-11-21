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
    <section className="container mx-auto px-5 mb-16 mt-12">
      <div className="mb-8">
        <Link href="/shows" className="inline-flex items-center gap-2 text-gray-300 hover:text-secondary transition-colors group">
          <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          <span className="font-semibold">Back To TV Shows</span>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 mb-12">
        <div className="flex-shrink-0 mx-auto lg:mx-0">
          <div className="relative group">
            <Image
              src={getImageUrl(show.poster_path, 'w500')}
              alt={show.name}
              width={400}
              height={600}
              className="w-full max-w-[400px] h-auto object-cover rounded-2xl shadow-2xl border-2 border-white/10 group-hover:border-secondary/50 transition-all duration-300"
              unoptimized
            />
            <div className="absolute -inset-2 bg-gradient-to-r from-secondary/20 to-yellow-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-4xl lg:text-5xl font-black mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            {show.name}
          </h1>
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-secondary/30">
              <i className="fas fa-star text-secondary"></i>
              <span className="font-bold text-lg">{show.vote_average.toFixed(1)}</span>
              <span className="text-gray-400 text-sm">/ 10</span>
            </div>
            {show.first_air_date && (
              <div className="flex items-center gap-2 text-gray-300">
                <i className="far fa-calendar text-secondary"></i>
                <span>First Air: {formatDate(show.first_air_date)}</span>
              </div>
            )}
          </div>
          <p className="text-lg leading-relaxed text-gray-300 mb-8">{show.overview}</p>
          
          {show.genres && show.genres.length > 0 && (
            <div className="mb-8">
              <h5 className="text-xl font-bold mb-4 text-secondary">Genres</h5>
              <div className="flex flex-wrap gap-3">
                {show.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-4 py-2 bg-gradient-to-r from-secondary/20 to-yellow-400/20 border border-secondary/50 rounded-full text-secondary font-semibold backdrop-blur-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {show.homepage && (
            <a
              href={show.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex items-center gap-2"
            >
              <i className="fas fa-external-link-alt"></i>
              Visit Show Homepage
            </a>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
        <h2 className="text-3xl font-black mb-8 bg-gradient-to-r from-secondary via-yellow-400 to-secondary bg-clip-text text-transparent">
          Show Info
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {show.number_of_episodes !== undefined && (
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <span className="text-secondary font-semibold block mb-1">Episodes</span>
              <span className="text-xl font-bold">{show.number_of_episodes}</span>
            </div>
          )}
          {show.number_of_seasons !== undefined && (
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <span className="text-secondary font-semibold block mb-1">Seasons</span>
              <span className="text-xl font-bold">{show.number_of_seasons}</span>
            </div>
          )}
          {show.last_episode_to_air && (
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <span className="text-secondary font-semibold block mb-1">Last Episode</span>
              <span className="text-lg font-bold">{show.last_episode_to_air.name}</span>
              {show.last_episode_to_air.air_date && (
                <span className="text-gray-400 text-sm block mt-1">
                  {formatDate(show.last_episode_to_air.air_date)}
                </span>
              )}
            </div>
          )}
          {show.status && (
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <span className="text-secondary font-semibold block mb-1">Status</span>
              <span className="text-xl font-bold">{show.status}</span>
            </div>
          )}
        </div>

        {show.production_companies && show.production_companies.length > 0 && (
          <div className="mt-8">
            <h4 className="text-2xl font-bold mb-4 text-secondary">Production Companies</h4>
            <div className="flex flex-wrap gap-3">
              {show.production_companies.map((company) => (
                <span
                  key={company.id}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-sm font-medium border border-white/20 hover:border-secondary/50 transition-colors"
                >
                  {company.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

