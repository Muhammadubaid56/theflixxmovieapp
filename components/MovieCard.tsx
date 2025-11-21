import Image from 'next/image'
import Link from 'next/link'
import { Movie, TVShow, getImageUrl } from '@/lib/tmdb'

interface MovieCardProps {
  item: Movie | TVShow
  type: 'movie' | 'tv'
}

export default function MovieCard({ item, type }: MovieCardProps) {
  const title = 'title' in item ? item.title : item.name
  const date = 'release_date' in item ? item.release_date : item.first_air_date
  const href = type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`
  const voteAverage = item.vote_average.toFixed(1)

  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:scale-105 hover:border-secondary/50 hover:shadow-2xl hover:shadow-secondary/20">
      <Link href={href} className="block">
        <div className="relative overflow-hidden rounded-t-xl">
          <Image
            src={getImageUrl(item.poster_path)}
            alt={title}
            width={500}
            height={750}
            className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-secondary/30">
            <i className="fas fa-star text-secondary text-xs"></i>
            <span className="text-white text-sm font-bold">{voteAverage}</span>
          </div>
        </div>
        <div className="p-4">
          <h5 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-secondary transition-colors duration-300">
            {title}
          </h5>
          <p className="text-sm text-gray-400 flex items-center gap-2">
            <i className="far fa-calendar text-xs"></i>
            <span>{date ? new Date(date).getFullYear() : 'N/A'}</span>
          </p>
        </div>
      </Link>
    </div>
  )
}

