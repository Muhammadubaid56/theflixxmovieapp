'use client'

import { useRouter } from 'next/navigation'

interface GenrePaginationProps {
  currentPage: number
  totalPages: number
  genreId: number
  genreName: string
  type: 'movies' | 'tv'
}

export default function GenrePagination({
  currentPage,
  totalPages,
  genreId,
  genreName,
  type,
}: GenrePaginationProps) {
  const router = useRouter()

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`/categories/${type}/${genreId}?name=${encodeURIComponent(genreName)}&page=${page}`)
    }
  }

  return (
    <div className="mt-12 flex flex-col items-center gap-6">
      <div className="flex gap-4">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-6 py-3 rounded-xl border-2 border-secondary/50 bg-black/30 backdrop-blur-sm text-white font-semibold transition-all duration-300 hover:bg-secondary/20 hover:border-secondary hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-black/30 disabled:hover:border-secondary/50"
        >
          <i className="fas fa-chevron-left mr-2"></i>
          Prev
        </button>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-6 py-3 rounded-xl border-2 border-secondary/50 bg-black/30 backdrop-blur-sm text-white font-semibold transition-all duration-300 hover:bg-secondary/20 hover:border-secondary hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-black/30 disabled:hover:border-secondary/50"
        >
          Next
          <i className="fas fa-chevron-right ml-2"></i>
        </button>
      </div>
      <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
        <i className="fas fa-file-alt text-secondary"></i>
        <span className="text-gray-300 font-semibold">
          Page <span className="text-secondary font-bold">{currentPage}</span> of <span className="text-secondary font-bold">{totalPages}</span>
        </span>
      </div>
    </div>
  )
}

