import { Suspense } from 'react'
import { fetchAPIData, Movie, TVShow, APIResponse } from '@/lib/tmdb'
import MovieCard from '@/components/MovieCard'
import SearchForm from '@/components/SearchForm'
import SearchPagination from '@/components/SearchPagination'

export const dynamic = 'force-dynamic'

interface SearchPageProps {
  searchParams: {
    query?: string
    type?: string
    page?: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.query || ''
  const type = searchParams.type || 'movie'
  const page = parseInt(searchParams.page || '1')

  let results: APIResponse<Movie> | APIResponse<TVShow> | null = null
  let error: string | null = null

  if (query) {
    try {
      results = await fetchAPIData<APIResponse<Movie> | APIResponse<TVShow>>(
        `search/${type}?query=${encodeURIComponent(query)}&page=${page}&language=en-US`
      )
    } catch (err) {
      error = 'Failed to fetch search results. Please try again.'
    }
  }

  return (
    <>
      {/* Search Section */}
      <section className="py-20 px-5 mb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent"></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black mb-3 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Search {type === 'movie' ? 'Movies' : 'TV Shows'}
            </h2>
            <p className="text-gray-400 text-lg">Find your favorite content</p>
          </div>
          <Suspense fallback={<div className="text-center text-gray-400">Loading search form...</div>}>
            <SearchForm initialQuery={query} initialType={type} />
          </Suspense>
        </div>
      </section>

      {/* Search Results */}
      {error && (
        <section className="container mx-auto px-5 mb-10">
          <div className="bg-gradient-to-r from-red-600/90 to-red-700/90 backdrop-blur-sm text-white p-6 rounded-2xl border border-red-500/50 shadow-xl">
            <div className="flex items-center gap-3">
              <i className="fas fa-exclamation-circle text-2xl"></i>
              <p className="font-semibold">{error}</p>
            </div>
          </div>
        </section>
      )}

      {query && results && (
        <section className="container mx-auto px-5 mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-black mb-2 bg-gradient-to-r from-secondary via-yellow-400 to-secondary bg-clip-text text-transparent">
              Search Results
            </h2>
            <p className="text-gray-400 text-lg">
              Found <span className="text-secondary font-bold">{results.total_results}</span> {type === 'movie' ? 'movies' : 'TV shows'} for &quot;<span className="text-white font-semibold">{query}</span>&quot;
            </p>
          </div>
          
          {results.results.length === 0 ? (
            <div className="text-center py-20 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10">
              <i className="fas fa-search text-6xl text-gray-600 mb-4"></i>
              <p className="text-2xl text-gray-400 font-semibold mb-2">No results found</p>
              <p className="text-gray-500">Try a different search term</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-8">
                {results.results.map((item) => (
                  <MovieCard
                    key={item.id}
                    item={item}
                    type={type as 'movie' | 'tv'}
                  />
                ))}
              </div>
              
              {results.total_pages > 1 && (
                <SearchPagination
                  currentPage={page}
                  totalPages={results.total_pages}
                  query={query}
                  type={type}
                />
              )}
            </>
          )}
        </section>
      )}

      {!query && (
        <section className="container mx-auto px-5 mb-16">
          <div className="text-center py-20 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10">
            <i className="fas fa-film text-6xl text-gray-600 mb-4"></i>
            <p className="text-2xl text-gray-400 font-semibold mb-2">Start Your Search</p>
            <p className="text-gray-500">Enter a search term above to find movies or TV shows</p>
          </div>
        </section>
      )}
    </>
  )
}

