'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useNavigationData } from '@/hooks/useHeaderData';
import { Button } from '@/components/ui';
import { motion, AnimatePresence } from 'framer-motion';

interface SiteSettings {
  email_address: string;
  telephone: string | null;
  office_address: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  instagram?: string;
}

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/tour-packages', label: 'Tour Packages' },
  { href: '/tour-destinations', label: 'Destinations' },
  { href: '/tour-adventures', label: 'Adventures' },
  { href: '/tour-events', label: 'Events' },
  { href: '/contact', label: 'Contact' },
];

const socialIcons = {
  facebook: 'fa-brands fa-facebook-f',
  twitter: 'fa-brands fa-twitter',
  linkedin: 'fa-brands fa-linkedin-in',
  youtube: 'fa-brands fa-youtube',
  instagram: 'fa-brands fa-instagram',
};

export default function Header() {
  const { settings, isLoading, error } = useNavigationData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      setShowTopBar(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Error loading navigation data
      </div>
    );
  }

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  const siteSettings: SiteSettings = settings?.data || {};

  return (
    <>
      {/* Top Bar */}
      <AnimatePresence>
        {showTopBar && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-primary-600 text-white text-sm py-2 overflow-hidden"
          >
            <div className="container">
              <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                {/* Contact Info */}
                <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm">
                  {siteSettings.email_address && (
                    <Link
                      href={`mailto:${siteSettings.email_address}`}
                      className="flex items-center gap-2 hover:text-primary-200 transition-colors"
                    >
                      <i className="fas fa-envelope"></i>
                      <span className="hidden sm:inline">{siteSettings.email_address}</span>
                    </Link>
                  )}
                  {siteSettings.telephone && (
                    <Link
                      href={`tel:${siteSettings.telephone}`}
                      className="flex items-center gap-2 hover:text-primary-200 transition-colors"
                    >
                      <i className="fas fa-phone"></i>
                      <span>{siteSettings.telephone}</span>
                    </Link>
                  )}
                  {siteSettings.office_address && (
                    <div className="hidden lg:flex items-center gap-2">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{siteSettings.office_address}</span>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  {Object.entries(socialIcons).map(([platform, iconClass]) => {
                    const url = siteSettings[platform as keyof SiteSettings];
                    if (!url) return null;
                    
                    return (
                      <Link
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                        aria-label={`Follow us on ${platform}`}
                      >
                        <i className={`${iconClass} text-xs`}></i>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white'
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" onClick={closeMobileMenu}>
              <Image
               src={`${'http://localhost:3000'}/assets/images/logo.png`}
                alt="GoTrav Papua"
                width={120}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative font-medium transition-colors hover:text-primary-600 ${
                    pathname === item.href
                      ? 'text-primary-600'
                      : 'text-gray-700'
                  }`}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <Button
                variant="primary"
                size="sm"
                className="hidden md:inline-flex"
                asChild
              >
                <Link href="/contact">Book Now</Link>
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span
                    className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
            >
              <nav className="container py-4">
                <div className="flex flex-col space-y-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`block py-2 px-4 rounded-md font-medium transition-colors ${
                        pathname === item.href
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-gray-200">
                    <Button variant="primary" className="w-full" asChild>
                      <Link href="/contact" onClick={closeMobileMenu}>
                        Book Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

function HeaderSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Top Bar Skeleton */}
      <div className="bg-gray-200 h-10"></div>
      
      {/* Main Header Skeleton */}
      <div className="bg-white border-b">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <div className="w-32 h-12 bg-gray-200 rounded"></div>
            <div className="hidden lg:flex space-x-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-20 h-6 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="w-24 h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
