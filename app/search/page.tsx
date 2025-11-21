import { Suspense } from 'react'
import { fetchAPIData, Movie, TVShow, APIResponse } from '@/lib/tmdb'
import MovieCard from '@/components/MovieCard'
import SearchForm from '@/components/SearchForm'
import SearchPagination from '@/components/SearchPagination'

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
      <section className="py-16 px-5 mb-10">
        <div className="container mx-auto max-w-4xl">
          <Suspense fallback={<div>Loading search form...</div>}>
            <SearchForm initialQuery={query} initialType={type} />
          </Suspense>
        </div>
      </section>

      {/* Search Results */}
      {error && (
        <section className="container mx-auto px-5 mb-10">
          <div className="bg-red-600 text-white p-5 rounded mb-5">
            {error}
          </div>
        </section>
      )}

      {query && results && (
        <section className="container mx-auto px-5 mb-10">
          <h2 className="text-2xl font-bold mb-6">
            Search Results for &quot;{query}&quot; ({results.total_results} {type === 'movie' ? 'movies' : 'TV shows'} found)
          </h2>
          
          {results.results.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl text-gray-400">No results found. Try a different search term.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-8">
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
        <section className="container mx-auto px-5 mb-10">
          <div className="text-center py-10">
            <p className="text-xl text-gray-400">Enter a search term to find movies or TV shows.</p>
          </div>
        </section>
      )}
    </>
  )
}

