'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname?.startsWith(path)) return true
    return false
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-b from-black/95 via-black/90 to-black/80 border-b border-white/10 shadow-2xl">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link 
            href="/" 
            className="group flex items-center space-x-2"
          >
            <div className="relative">
              <span className="text-4xl font-black uppercase bg-gradient-to-r from-secondary via-yellow-400 to-secondary bg-clip-text text-transparent tracking-tight">
                FLIXX
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-secondary to-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`relative px-6 py-3 text-lg font-semibold transition-all duration-300 rounded-lg ${
                isActive('/') && pathname !== '/shows' && pathname !== '/search'
                  ? 'text-secondary'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <span className="relative z-10">Movies</span>
              {isActive('/') && pathname !== '/shows' && pathname !== '/search' && (
                <span className="absolute inset-0 bg-secondary/20 rounded-lg blur-sm"></span>
              )}
            </Link>
            <Link
              href="/shows"
              className={`relative px-6 py-3 text-lg font-semibold transition-all duration-300 rounded-lg ${
                isActive('/shows')
                  ? 'text-secondary'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <span className="relative z-10">TV Shows</span>
              {isActive('/shows') && (
                <span className="absolute inset-0 bg-secondary/20 rounded-lg blur-sm"></span>
              )}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white p-2">
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

