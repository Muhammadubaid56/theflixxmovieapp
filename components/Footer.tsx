export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-black via-primary to-primary border-t border-white/10 mt-20">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <span className="text-3xl font-black uppercase bg-gradient-to-r from-secondary via-yellow-400 to-secondary bg-clip-text text-transparent">
              FLIXX
            </span>
            <p className="text-gray-400 mt-2 text-sm">
              Your ultimate destination for movies and TV shows
            </p>
          </div>
          <div className="flex gap-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-secondary/20 flex items-center justify-center text-xl text-gray-300 hover:text-secondary transition-all duration-300 hover:scale-110 border border-white/10 hover:border-secondary/50"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-secondary/20 flex items-center justify-center text-xl text-gray-300 hover:text-secondary transition-all duration-300 hover:scale-110 border border-white/10 hover:border-secondary/50"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-secondary/20 flex items-center justify-center text-xl text-gray-300 hover:text-secondary transition-all duration-300 hover:scale-110 border border-white/10 hover:border-secondary/50"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Flixx. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

