'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { TourCard } from '../TourCard/TourCard';
import { TourAdventure } from '@/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface AdventuresProps {
  data: TourAdventure[] | { data: TourAdventure[] } | any;
}

export function Adventures({ data }: AdventuresProps) {
  const items = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
  const sortedData = [...items].sort((a: any, b: any) => (a?.id || 0) - (b?.id || 0));

  return (
    <section
      id="our-adventures"
      aria-label="Popular adventures"
      className="relative section-padding bg-cover bg-center"
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_HOST}/assets/images/slider/7.png)`,
      }}
    >
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div className="container relative">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 lg:mb-12 items-center">
          <div>
            <h2 className="heading-primary text-white">Adventures</h2>
          </div>
          <div className="lg:col-span-2 text-white/90 text-base md:text-lg leading-relaxed">
            Join the quest of a lifetime, as you traverse mystical lands, unlock arcane
            secrets, and become a legend in this captivating tale of courage and discovery.
          </div>
        </div>

        {/* Adventures Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={16}
          navigation={{
            nextEl: '.adventures-button-next',
            prevEl: '.adventures-button-prev',
          }}
          pagination={{ 
            clickable: true,
            el: '.adventures-pagination',
          }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          breakpoints={{
            480: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="adventures-swiper"
        >
          {sortedData.map((adventure, index) => (
            <SwiperSlide key={adventure.id || index}>
              <TourCard
                tour={adventure}
                type="adventure"
                className="h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button className="adventures-button-prev w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group">
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="adventures-pagination flex space-x-2"></div>
          
          <button className="adventures-button-next w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group">
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
