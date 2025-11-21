import Image from 'next/image'
import Link from 'next/link'
import { fetchAPIData, Movie, getImageUrl } from '@/lib/tmdb'
import { notFound } from 'next/navigation'

interface MovieDetailsPageProps {
  params: {
    id: string
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

  return (
    <section className="container mx-auto px-5 mb-10 mt-10">
      <div className="mb-8">
        <Link href="/" className="btn">
          Back To Movies
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-16 mb-8">
        <div className="flex-shrink-0">
          <Image
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            width={400}
            height={600}
            className="w-full max-w-[400px] h-auto object-cover"
            unoptimized
          />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
          <p className="mb-4 flex items-center gap-2">
            <i className="fas fa-star text-secondary"></i>
            {movie.vote_average.toFixed(1)} / 10
          </p>
          <p className="text-gray-400 mb-4">
            Release Date: {movie.release_date ? formatDate(movie.release_date) : 'N/A'}
          </p>
          <p className="mb-6 leading-relaxed">{movie.overview}</p>
          
          {movie.genres && movie.genres.length > 0 && (
            <>
              <h5 className="text-xl font-semibold mb-3">Genres</h5>
              <ul className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
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

          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-block"
            >
              Visit Movie Homepage
            </a>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 pt-8">
        <h2 className="text-2xl font-bold mb-6">Movie Info</h2>
        <ul className="space-y-4">
          {movie.budget !== undefined && movie.budget > 0 && (
            <li className="pb-2 border-b border-white/10">
              <span className="text-secondary">Budget:</span>{' '}
              {formatCurrency(movie.budget)}
            </li>
          )}
          {movie.revenue !== undefined && movie.revenue > 0 && (
            <li className="pb-2 border-b border-white/10">
              <span className="text-secondary">Revenue:</span>{' '}
              {formatCurrency(movie.revenue)}
            </li>
          )}
          {movie.runtime && (
            <li className="pb-2 border-b border-white/10">
              <span className="text-secondary">Runtime:</span> {formatRuntime(movie.runtime)}
            </li>
          )}
          {movie.status && (
            <li className="pb-2 border-b border-white/10">
              <span className="text-secondary">Status:</span> {movie.status}
            </li>
          )}
        </ul>

        {movie.production_companies && movie.production_companies.length > 0 && (
          <>
            <h4 className="text-xl font-semibold mt-8 mb-4">Production Companies</h4>
            <div className="flex flex-wrap gap-3">
              {movie.production_companies.map((company) => (
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

