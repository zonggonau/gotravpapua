'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useNavigationData } from '@/hooks/useHeaderData';
import { Button } from '@/components/ui';
import { motion } from 'framer-motion';

interface SiteSettings {
  site_name: string;
  site_description: string;
  email_address: string;
  telephone: string | null;
  office_address: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  instagram?: string;
}

const footerLinks = {
  tours: [
    { label: 'Tour Packages', href: '/tour-packages' },
    { label: 'Destinations', href: '/tour-destinations' },
    { label: 'Adventures', href: '/tour-adventures' },
    { label: 'Events', href: '/tour-events' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Booking Policy', href: '/booking-policy' },
  ],
};

const socialIcons = {
  facebook: { icon: 'fa-brands fa-facebook-f', color: 'hover:bg-blue-600' },
  twitter: { icon: 'fa-brands fa-twitter', color: 'hover:bg-sky-500' },
  linkedin: { icon: 'fa-brands fa-linkedin-in', color: 'hover:bg-blue-700' },
  youtube: { icon: 'fa-brands fa-youtube', color: 'hover:bg-red-600' },
  instagram: { icon: 'fa-brands fa-instagram', color: 'hover:bg-pink-600' },
};

export default function Footer() {
  const { settings, error, isLoading } = useNavigationData();
  const [currentYear] = useState(new Date().getFullYear());

  if (error) {
    return (
      <footer className="bg-gray-900 text-white py-8">
        <div className="container text-center">
          <p>Error loading footer data</p>
        </div>
      </footer>
    );
  }

  if (isLoading) {
    return <FooterSkeleton />;
  }

  const siteSettings: SiteSettings = settings?.data || {};

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20" />
        <svg className="absolute bottom-0 left-0 w-full h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
        </svg>
      </div>

      <div className="relative">
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready for Your Papua Adventure?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                We&apos;d love to hear from you! Whether you have a question, suggestion, 
                or just want to say hello, we&apos;re here to listen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-gray-100"
                  asChild
                >
                  <Link href="/contact">
                    <i className="fas fa-envelope mr-2"></i>
                    Get In Touch
                  </Link>
                </Button>
                {siteSettings.telephone && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-primary-600"
                    asChild
                  >
                    <Link href={`https://wa.me/${siteSettings.telephone.replace(/\D/g, '')}`} target="_blank">
                      <i className="fab fa-whatsapp mr-2"></i>
                      WhatsApp Now
                    </Link>
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Company Info */}
              <div className="lg:col-span-1">
                <Link href="/" className="inline-block mb-6">
                  <Image
                    src={`http://localhost:3000/assets/images/logo.png`}
                    alt="GoTrav Papua"
                    width={150}
                    height={75}
                    className="h-12 w-auto brightness-0 invert"
                  />
                </Link>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Discover the untouched beauty of Papua with our carefully curated 
                  travel experiences. Your trusted partner for unforgettable adventures.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  {siteSettings.email_address && (
                    <Link
                      href={`mailto:${siteSettings.email_address}`}
                      className="flex items-center text-gray-300 hover:text-white transition-colors"
                    >
                      <i className="fas fa-envelope w-5 mr-3"></i>
                      <span className="text-sm">{siteSettings.email_address}</span>
                    </Link>
                  )}
                  {siteSettings.telephone && (
                    <Link
                      href={`tel:${siteSettings.telephone}`}
                      className="flex items-center text-gray-300 hover:text-white transition-colors"
                    >
                      <i className="fas fa-phone w-5 mr-3"></i>
                      <span className="text-sm">{siteSettings.telephone}</span>
                    </Link>
                  )}
                  {siteSettings.office_address && (
                    <div className="flex items-start text-gray-300">
                      <i className="fas fa-map-marker-alt w-5 mr-3 mt-1"></i>
                      <span className="text-sm">{siteSettings.office_address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tours Links */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-6">Tours & Experiences</h3>
                <ul className="space-y-3">
                  {footerLinks.tours.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-6">Support</h3>
                <ul className="space-y-3">
                  {footerLinks.support.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Newsletter Signup */}
                <div className="mt-8">
                  <h4 className="text-white font-medium mb-3">Stay Updated</h4>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white text-sm focus:outline-none focus:border-primary-500"
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      className="rounded-l-none"
                    >
                      <i className="fas fa-paper-plane"></i>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <div className="text-gray-400 text-sm text-center md:text-left">
                <p>
                  © {currentYear} GoTrav Papua. All rights reserved. |{' '}
                  <Link href="/" className="hover:text-white transition-colors">
                    www.gotravpapua.com
                  </Link>
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {Object.entries(socialIcons).map(([platform, config]) => {
                  const url = siteSettings[platform as keyof SiteSettings];
                  if (!url) return null;

                  return (
                    <Link
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 ${config.color}`}
                      aria-label={`Follow us on ${platform}`}
                    >
                      <i className={config.icon}></i>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterSkeleton() {
  return (
    <footer className="bg-gray-900 text-white animate-pulse">
      {/* CTA Section Skeleton */}
      <div className="bg-gray-800 py-16">
        <div className="container text-center">
          <div className="h-8 bg-gray-700 rounded w-96 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3 mx-auto mb-8"></div>
          <div className="flex justify-center gap-4">
            <div className="h-12 bg-gray-700 rounded w-32"></div>
            <div className="h-12 bg-gray-700 rounded w-32"></div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-6 bg-gray-800 rounded w-32"></div>
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="h-4 bg-gray-800 rounded w-24"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar Skeleton */}
      <div className="border-t border-gray-800 py-6">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-800 rounded w-64"></div>
            <div className="flex space-x-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-10 h-10 bg-gray-800 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
