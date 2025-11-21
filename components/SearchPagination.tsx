'use client'

import { useRouter } from 'next/navigation'

interface SearchPaginationProps {
  currentPage: number
  totalPages: number
  query: string
  type: string
}

export default function SearchPagination({
  currentPage,
  totalPages,
  query,
  type,
}: SearchPaginationProps) {
  const router = useRouter()

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`/search?query=${encodeURIComponent(query)}&type=${type}&page=${page}`)
    }
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <div className="flex gap-4">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn"
        >
          Prev
        </button>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn"
        >
          Next
        </button>
      </div>
      <div className="text-sm text-gray-400">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  )
}

