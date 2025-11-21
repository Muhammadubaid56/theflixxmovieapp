export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-t from-black via-primary to-primary border-t border-white/10 mt-20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <span className="text-4xl font-black uppercase bg-gradient-to-r from-secondary via-yellow-400 to-secondary bg-clip-text text-transparent inline-block mb-4">
              FLIXX
            </span>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate destination for discovering and exploring movies and TV shows. Find your next favorite entertainment.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-secondary transition-colors duration-300 inline-flex items-center gap-2 group">
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  <span>Movies</span>
                </a>
              </li>
              <li>
                <a href="/shows" className="text-gray-400 hover:text-secondary transition-colors duration-300 inline-flex items-center gap-2 group">
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  <span>TV Shows</span>
                </a>
              </li>
              <li>
                <a href="/search" className="text-gray-400 hover:text-secondary transition-colors duration-300 inline-flex items-center gap-2 group">
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  <span>Search</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-4">Connect</h3>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 flex items-center justify-center text-xl text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 border border-white/10 hover:border-transparent shadow-lg hover:shadow-blue-500/50"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f group-hover:scale-110 transition-transform"></i>
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-sky-400 hover:to-sky-500 flex items-center justify-center text-xl text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 border border-white/10 hover:border-transparent shadow-lg hover:shadow-sky-500/50"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter group-hover:scale-110 transition-transform"></i>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 flex items-center justify-center text-xl text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 border border-white/10 hover:border-transparent shadow-lg hover:shadow-pink-500/50"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram group-hover:scale-110 transition-transform"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {currentYear} Flixx. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Made with</span>
              <i className="fas fa-heart text-red-500 animate-pulse"></i>
              <span>by</span>
              <a
                href="https://github.com/Muhammadubaid56"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-secondary hover:text-yellow-400 font-semibold transition-all duration-300 hover:scale-105"
              >
                <span className="bg-gradient-to-r from-secondary to-yellow-400 bg-clip-text text-transparent group-hover:from-yellow-400 group-hover:to-secondary transition-all">
                  Muhammad Ubaid
                </span>
                <i className="fab fa-github group-hover:translate-x-1 transition-transform"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

