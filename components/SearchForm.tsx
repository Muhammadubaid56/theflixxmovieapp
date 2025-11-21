'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SearchFormProps {
  initialQuery: string
  initialType: string
}

export default function SearchForm({ initialQuery, initialType }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery)
  const [type, setType] = useState(initialType)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}&type=${type}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-4 mb-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="type"
            value="movie"
            checked={type === 'movie'}
            onChange={(e) => setType(e.target.value)}
            className="cursor-pointer"
          />
          <span>Movies</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="type"
            value="tv"
            checked={type === 'tv'}
            onChange={(e) => setType(e.target.value)}
            className="cursor-pointer"
          />
          <span>TV Shows</span>
        </label>
      </div>
      <div className="flex gap-2.5">
        <input
          type="text"
          name="query"
          id="search-term"
          placeholder="Enter search term"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 h-12 px-2.5 border border-white rounded bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-secondary"
          required
        />
        <button
          type="submit"
          className="flex-shrink-0 w-12 h-12 rounded bg-secondary text-black cursor-pointer transition-all duration-300 hover:bg-transparent hover:text-white flex items-center justify-center"
        >
          <i className="fas fa-search"></i>
        </button>
      </div>
    </form>
  )
}

