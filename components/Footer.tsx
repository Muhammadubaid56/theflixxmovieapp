export default function Footer() {
  return (
    <footer className="bg-primary py-5 mt-5">
      <div className="container mx-auto px-5 flex justify-between items-center">
        <div className="text-white text-2xl font-bold uppercase">
          <span>FLIXX</span>
        </div>
        <div className="flex gap-3 text-xl">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-colors hover:text-secondary"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-colors hover:text-secondary"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-colors hover:text-secondary"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  )
}

