'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'
import { Movie, getImageUrl } from '@/lib/tmdb'

interface NowPlayingSliderProps {
  movies: Movie[]
}

export default function NowPlayingSlider({ movies }: NowPlayingSliderProps) {
  return (
    <section
      className="relative py-24 px-6 lg:px-16 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: "url('/images/showcase-bg.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
      <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-secondary via-yellow-400 to-secondary bg-clip-text text-transparent uppercase tracking-tight">
            Now Playing
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto"></div>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ 
            clickable: true,
            bulletClass: 'swiper-pagination-bullet !bg-secondary/50',
            bulletActiveClass: 'swiper-pagination-bullet-active !bg-secondary'
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
          className="!pb-16"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id} className="text-center">
              <Link href={`/movie/${movie.id}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl border-2 border-transparent group-hover:border-secondary transition-all duration-300 shadow-2xl group-hover:shadow-secondary/30">
                  <Image
                    src={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    width={300}
                    height={450}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{movie.title}</h3>
                    <div className="flex items-center justify-center gap-2 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full inline-flex border border-secondary/30">
                      <i className="fas fa-star text-secondary"></i>
                      <span className="text-white font-bold">{movie.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

