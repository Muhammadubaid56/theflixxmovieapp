import Image from 'next/image'
import Link from 'next/link'
import { fetchAPIData, Movie, getImageUrl } from '@/lib/tmdb'
import { notFound } from 'next/navigation'
import { generateMetadata as genMeta, generateStructuredData } from '@/lib/metadata'
import type { Metadata } from 'next'

interface MovieDetailsPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: MovieDetailsPageProps): Promise<Metadata> {
  try {
    const movie = await fetchAPIData<Movie>(`movie/${params.id}`)
    const genres = movie.genres?.map(g => g.name) || []
    
    return genMeta({
      title: `${movie.title} (${movie.release_date?.split('-')[0] || ''}) - Movie Details & Info`,
      description: movie.overview || `Watch ${movie.title} - ${genres.join(', ')} movie. Rating: ${movie.vote_average}/10. Release date: ${movie.release_date}`,
      keywords: [movie.title, ...genres, 'movie', 'film', 'cinema', 'watch', 'streaming', 'entertainment'],
      image: getImageUrl(movie.backdrop_path || movie.poster_path, 'w1280'),
      url: `/movie/${params.id}`,
      type: 'movie',
    })
  } catch {
    return genMeta({
      title: 'Movie Not Found',
      description: 'The requested movie could not be found.',
    })
  }
}

export default async function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  let movie: Movie
  try {
    movie = await fetchAPIData<Movie>(`movie/${params.id}`)
  } catch (error) {
    notFound()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const structuredData = generateStructuredData({
    type: 'Movie',
    title: movie.title,
    description: movie.overview,
    image: getImageUrl(movie.backdrop_path || movie.poster_path, 'w1280'),
    url: `/movie/${movie.id}`,
    datePublished: movie.release_date,
    rating: movie.vote_average,
    genre: movie.genres?.map(g => g.name) || [],
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="container mx-auto px-5 mb-16 mt-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-300 hover:text-secondary transition-colors group">
          <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          <span className="font-semibold">Back To Movies</span>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 mb-12">
        <div className="flex-shrink-0 mx-auto lg:mx-0">
          <div className="relative group">
            <Image
              src={getImageUrl(movie.poster_path, 'w500')}
              alt={movie.title}
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
            {movie.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-secondary/30">
              <i className="fas fa-star text-secondary"></i>
              <span className="font-bold text-lg">{movie.vote_average.toFixed(1)}</span>
              <span className="text-gray-400 text-sm">/ 10</span>
            </div>
            {movie.release_date && (
              <div className="flex items-center gap-2 text-gray-300">
                <i className="far fa-calendar text-secondary"></i>
                <span>{formatDate(movie.release_date)}</span>
              </div>
            )}
          </div>
          <p className="text-lg leading-relaxed text-gray-300 mb-8">{movie.overview}</p>
          
          {movie.genres && movie.genres.length > 0 && (
            <div className="mb-8">
              <h5 className="text-xl font-bold mb-4 text-secondary">Genres</h5>
              <div className="flex flex-wrap gap-3">
                {movie.genres.map((genre) => (
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

          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex items-center gap-2"
            >
              <i className="fas fa-external-link-alt"></i>
              Visit Movie Homepage
            </a>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
        <h2 className="text-3xl font-black mb-8 bg-gradient-to-r from-secondary via-yellow-400 to-secondary bg-clip-text text-transparent">
          Movie Info
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {movie.budget !== undefined && movie.budget > 0 && (
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <span className="text-secondary font-semibold block mb-1">Budget</span>
              <span className="text-xl font-bold">{formatCurrency(movie.budget)}</span>
            </div>
          )}
          {movie.revenue !== undefined && movie.revenue > 0 && (
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <span className="text-secondary font-semibold block mb-1">Revenue</span>
              <span className="text-xl font-bold">{formatCurrency(movie.revenue)}</span>
            </div>
          )}
          {movie.runtime && (
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <span className="text-secondary font-semibold block mb-1">Runtime</span>
              <span className="text-xl font-bold">{formatRuntime(movie.runtime)}</span>
            </div>
          )}
          {movie.status && (
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <span className="text-secondary font-semibold block mb-1">Status</span>
              <span className="text-xl font-bold">{movie.status}</span>
            </div>
          )}
        </div>

        {movie.production_companies && movie.production_companies.length > 0 && (
          <div className="mt-8">
            <h4 className="text-2xl font-bold mb-4 text-secondary">Production Companies</h4>
            <div className="flex flex-wrap gap-3">
              {movie.production_companies.map((company) => (
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
    </>
  )
}

