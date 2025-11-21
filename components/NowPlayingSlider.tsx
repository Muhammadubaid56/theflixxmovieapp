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
      className="py-16 px-16 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/showcase-bg.jpg')",
      }}
    >
      <h2 className="my-5 text-center uppercase text-2xl font-bold mb-8">
        Now Playing
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
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
        }}
        className="w-full"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="text-center">
            <Link href={`/movie/${movie.id}`}>
              <div className="flex flex-col items-center">
                <Image
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="w-full h-auto object-cover"
                  unoptimized
                />
                <h4 className="p-2.5 flex items-center justify-center gap-2">
                  <i className="fas fa-star text-secondary"></i>
                  {movie.vote_average.toFixed(1)} / 10
                </h4>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

