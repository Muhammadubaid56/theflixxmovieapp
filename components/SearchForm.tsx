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
      <div className="flex justify-center gap-6 mb-6">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="radio"
            name="type"
            value="movie"
            checked={type === 'movie'}
            onChange={(e) => setType(e.target.value)}
            className="w-5 h-5 cursor-pointer accent-secondary"
          />
          <span className="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors">Movies</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="radio"
            name="type"
            value="tv"
            checked={type === 'tv'}
            onChange={(e) => setType(e.target.value)}
            className="w-5 h-5 cursor-pointer accent-secondary"
          />
          <span className="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors">TV Shows</span>
        </label>
      </div>
      <div className="flex gap-3 bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10 shadow-2xl">
        <input
          type="text"
          name="query"
          id="search-term"
          placeholder="Search for movies, TV shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 h-14 px-6 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
          required
        />
        <button
          type="submit"
          className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-r from-secondary to-yellow-400 text-black font-bold cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-secondary/50 flex items-center justify-center"
        >
          <i className="fas fa-search text-xl"></i>
        </button>
      </div>
    </form>
  )
}

