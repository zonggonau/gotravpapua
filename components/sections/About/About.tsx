'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

const stats = [
  { number: '500+', label: 'Happy Travelers' },
  { number: '50+', label: 'Tour Packages' },
  { number: '25+', label: 'Destinations' },
  { number: '5+', label: 'Years Experience' },
];

const features = [
  {
    icon: 'fas fa-map-marked-alt',
    title: 'Expert Local Guides',
    description: 'Our experienced local guides know every hidden gem and cultural secret of Papua.',
  },
  {
    icon: 'fas fa-shield-alt',
    title: 'Safe & Secure',
    description: 'Your safety is our priority with comprehensive insurance and safety protocols.',
  },
  {
    icon: 'fas fa-heart',
    title: 'Personalized Experience',
    description: 'Customized itineraries tailored to your interests and travel preferences.',
  },
  {
    icon: 'fas fa-leaf',
    title: 'Eco-Friendly Tourism',
    description: 'Sustainable travel practices that protect Papua\'s pristine environment.',
  },
];

export default function About() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container">
        {/* Main About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Image & Video Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={`${process.env.NEXT_PUBLIC_HOST}assets/images/adventures/5.png`}
                alt="GoTrav Papua Adventure"
                width={600}
                height={400}
                className="w-full h-[400px] object-cover"
              />
              
              {/* Video Play Button */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <button
                  onClick={handleVideoPlay}
                  className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-600 hover:bg-white hover:scale-110 transition-all duration-300 group"
                  aria-label="Play video"
                >
                  <i className="fas fa-play text-2xl ml-1 group-hover:scale-110 transition-transform"></i>
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary-500 rounded-full opacity-30"></div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.slice(0, 2).map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-lg text-center"
                >
                  <div className="text-2xl font-bold text-primary-600 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="heading-primary mb-4">
                Discover the Magic of{' '}
                <span className="text-primary-600">Papua</span>
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Your gateway to exploring the enchanting beauty of Papua
              </p>
              <p className="text-gray-600 leading-relaxed">
                As a premier travel agency in this breathtaking region, we curate unforgettable 
                experiences for adventurers and nature enthusiasts alike. Our expert team is 
                passionate about showcasing the rich cultural heritage, lush landscapes, and 
                diverse wildlife that make Papua a truly unique destination.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <i className={`${feature.icon} text-primary-600`}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/tour-packages">
                  Explore Tour Packages
                  <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/tour-adventures">
                  Our Adventures
                  <i className="fas fa-mountain ml-2"></i>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold text-primary-600 mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl"
              aria-label="Close video"
            >
              <i className="fas fa-times"></i>
            </button>
            <iframe
              src="https://www.youtube.com/embed/atMUy_bPoQI?autoplay=1"
              title="GoTrav Papua Video"
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
