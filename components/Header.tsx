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
    <header className="bg-black/80 py-5">
      <div className="container mx-auto px-5 flex justify-between items-center">
        <div className="text-white text-2xl font-bold uppercase">
          <Link href="/">FLIXX</Link>
        </div>
        <nav>
          <ul className="flex gap-5">
            <li>
              <Link
                href="/"
                className={`text-base transition-colors hover:text-secondary ${
                  isActive('/') && pathname !== '/shows' && pathname !== '/search'
                    ? 'text-secondary font-bold'
                    : ''
                }`}
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                href="/shows"
                className={`text-base transition-colors hover:text-secondary ${
                  isActive('/shows') ? 'text-secondary font-bold' : ''
                }`}
              >
                TV Shows
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

