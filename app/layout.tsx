import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Flixx - Movie & TV Show Streaming',
  description: 'Discover and watch your favorite movies and TV shows',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

