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

  return (
    <div className="bg-[#04376b] p-1 transition-all duration-500 hover:scale-105 hover:bg-[#0a4b8f]">
      <Link href={href}>
        <Image
          src={getImageUrl(item.poster_path)}
          alt={title}
          width={500}
          height={750}
          className="w-full h-auto"
          unoptimized
        />
      </Link>
      <div className="p-2.5 text-xl">
        <h5 className="font-semibold mb-2">{title}</h5>
        <p className="text-sm text-gray-400">
          {type === 'movie' ? 'Release' : 'Air date'}: {date || 'N/A'}
        </p>
      </div>
    </div>
  )
}

