'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlay } from '@fortawesome/free-solid-svg-icons';
import { SliderItem } from '@/types';
import { generateImageUrl } from '@/lib/utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface HeroCarouselProps {
  data: SliderItem[];
}

export default function HeroCarousel({ data }: HeroCarouselProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !data?.length) {
    return <HeroSkeleton />;
  }

  const sortedData = [...data].sort((a, b) => a.id - b.id);

  return (
    <section className="relative h-screen overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        navigation={{
          nextEl: '.hero-button-next',
          prevEl: '.hero-button-prev',
        }}
        pagination={{
          clickable: true,
          el: '.hero-pagination',
          bulletClass: 'hero-pagination-bullet',
          bulletActiveClass: 'hero-pagination-bullet-active',
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full"
      >
        {sortedData.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <HeroSlide slide={slide} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button className="hero-button-prev absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group">
        <FontAwesomeIcon 
          icon={faChevronLeft} 
          className="w-5 h-5 group-hover:scale-110 transition-transform" 
        />
      </button>
      
      <button className="hero-button-next absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group">
        <FontAwesomeIcon 
          icon={faChevronRight} 
          className="w-5 h-5 group-hover:scale-110 transition-transform" 
        />
      </button>

      {/* Pagination */}
      <div className="hero-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-2"></div>
    </section>
  );
}

function HeroSlide({ slide, index }: { slide: SliderItem; index: number }) {
  return (
    <div className="relative h-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={generateImageUrl(slide.picture)}
          alt={slide.title}
          fill
          className="object-cover"
          priority={index === 0}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-display leading-tight">
                {slide.title}
              </h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed"
              >
                {slide.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                {slide.button_link && slide.button_text && (
                  <Link
                    href={slide.button_link}
                    className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    {slide.button_text}
                  </Link>
                )}
                
                <button className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-all duration-300 group">
                  <FontAwesomeIcon 
                    icon={faPlay} 
                    className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" 
                  />
                  Watch Video
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-8 text-white"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-medium">Scroll</span>
          <div className="w-px h-12 bg-white/50 relative">
            <motion.div
              className="absolute top-0 left-0 w-full bg-white"
              animate={{ height: ['0%', '100%', '0%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function HeroSkeleton() {
  return (
    <div className="h-screen bg-gray-200 animate-pulse flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl space-y-6">
          <div className="h-16 bg-gray-300 rounded-lg w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-2/3"></div>
          <div className="flex space-x-4 pt-4">
            <div className="h-12 bg-gray-300 rounded-lg w-32"></div>
            <div className="h-12 bg-gray-300 rounded-lg w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles are now in globals.css
