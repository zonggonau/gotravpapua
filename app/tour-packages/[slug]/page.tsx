'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { endpoint, fetcher } from '@/data/api';
import { Button, Badge, Card, CardContent } from '@/components/ui';
import { formatDate, generateImageUrl, formatPrice, getCleanText } from '@/lib/utils';
import { TourPackage } from '@/types';
import { toast } from 'react-toastify';

export default function PackageDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Debug logging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Package Detail Debug:', {
        params,
        slug,
        endpoint: endpoint.tourpackages,
        fullUrl: slug ? `${endpoint.tourpackages}/${slug}` : 'No slug'
      });
    }
  }, [params, slug]);

  const { data, error, isLoading } = useSWR(
    slug ? `${endpoint.tourpackages}/${slug}` : null,
    async (url) => {
      try {
        // First try the direct slug endpoint
        const response = await fetcher(url);
        
        // Handle paginated response - look for the specific package in the data array
        if (response?.data?.data && Array.isArray(response.data.data)) {
          const tourPackage = response.data.data.find((item: any) => item.slug === slug);
          if (tourPackage) {
            return { data: tourPackage };
          }
        }
        
        // If direct response has the package data
        if (response?.data && !Array.isArray(response.data)) {
          return response;
        }
        
        return response;
      } catch (error) {
        // Last resort: get all packages and find the one with matching slug
        console.log('Trying to find package in full list...');
        const allPackages = await fetcher(endpoint.tourpackages);
        if (allPackages?.data?.data && Array.isArray(allPackages.data.data)) {
          const tourPackage = allPackages.data.data.find((item: any) => item.slug === slug);
          if (tourPackage) {
            return { data: tourPackage };
          }
        }
        throw error;
      }
    },
    {
      onSuccess: (data) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Package data loaded:', data);
        }
      },
      onError: (error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ Package loading failed:', error);
        }
        toast.error('Failed to load package details');
      }
    }
  );

  // Loading state
  if (isLoading) {
    return <PackageDetailSkeleton />;
  }
  
  // Error state
  if (error) {
    return <ErrorState error={error} />;
  }
  
  // Not found state - check multiple data structures
  const packageData = data?.data || data;
  if (!packageData) {
    return <NotFoundState />;
  }

  const tourPackage: TourPackage = packageData;
  const images = tourPackage.gallery || [tourPackage.picture];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white border-b py-4">
        <div className="container">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary-600">
              Home
            </Link>
            <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
            <Link href="/tour-packages" className="text-gray-500 hover:text-primary-600">
              Tour Packages
            </Link>
            <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
            <span className="text-gray-900 font-medium">{tourPackage.title}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src={generateImageUrl(images[selectedImageIndex])}
          alt={tourPackage.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white max-w-3xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className="text-white bg-secondary-600">
                  <i className="fas fa-suitcase mr-2"></i>
                  Tour Package
                </Badge>
                <Badge variant="outline" className="text-white border-white">
                  <i className="fas fa-clock mr-2"></i>
                  {tourPackage.duration || 'Multi-day'}
                </Badge>
                <Badge variant="outline" className="text-white border-white">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  {tourPackage.location || 'Papua'}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {tourPackage.title}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                {getCleanText(tourPackage.description || tourPackage.body || '', 200)}
              </p>
              {tourPackage.price && (
                <div className="text-3xl font-bold">
                  {formatPrice(tourPackage.price)}
                  <span className="text-lg font-normal text-white/80 ml-2">
                    per person
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Image Navigation */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === selectedImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Package Overview</h2>
                  <div className="prose max-w-none">
                    <div 
                      className="text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: tourPackage.body || tourPackage.description }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Itinerary */}
              {tourPackage.itinerary && tourPackage.itinerary.length > 0 && (
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6">Itinerary</h2>
                    <div className="space-y-6">
                      {tourPackage.itinerary.map((day, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="font-bold text-primary-600">
                              {day.day}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">
                              Day {day.day}: {day.title}
                            </h3>
                            <p className="text-gray-600 mb-3">
                              {day.description}
                            </p>
                            {day.activities && day.activities.length > 0 && (
                              <div className="space-y-1">
                                <h4 className="font-medium text-sm text-gray-800">
                                  Activities:
                                </h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {day.activities.map((activity, actIndex) => (
                                    <li key={actIndex} className="flex items-center gap-2">
                                      <i className="fas fa-check text-green-500 text-xs"></i>
                                      {activity}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Facilities */}
              {tourPackage.facilities && tourPackage.facilities.length > 0 && (
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">What&apos;s Included</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tourPackage.facilities.map((facility, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <i className="fas fa-check-circle text-green-500"></i>
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Gallery */}
              {images.length > 1 && (
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className="relative aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform"
                        >
                          <Image
                            src={generateImageUrl(image)}
                            alt={`${tourPackage.title} ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <Card className="sticky top-6">
                <CardContent className="p-6">
                  {tourPackage.price && (
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-primary-600 mb-2">
                        {formatPrice(tourPackage.price)}
                      </div>
                      <div className="text-gray-600">per person</div>
                    </div>
                  )}
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{tourPackage.duration || 'Multi-day'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Location</span>
                      <span className="font-medium">{tourPackage.location || 'Papua'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Status</span>
                      <Badge variant="success">{tourPackage.status}</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => setShowBookingForm(true)}
                    >
                      Book Now
                      <i className="fas fa-calendar-plus ml-2"></i>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/contact">
                        Get Quote
                        <i className="fas fa-calculator ml-2"></i>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Package Highlights */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Package Highlights</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-users text-primary-600 w-4"></i>
                      <span>Small group experience</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-user-tie text-primary-600 w-4"></i>
                      <span>Professional guide</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-utensils text-primary-600 w-4"></i>
                      <span>Meals included</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-bed text-primary-600 w-4"></i>
                      <span>Accommodation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-car text-primary-600 w-4"></i>
                      <span>Transportation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Share */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Share This Package</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        const url = window.location.href;
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
                      title="Share on Facebook"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </button>
                    <button
                      onClick={() => {
                        const url = window.location.href;
                        const text = `Check out this amazing tour package: ${tourPackage.title}`;
                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                      }}
                      className="flex-1 bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-lg transition-colors"
                      title="Share on Twitter"
                    >
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button
                      onClick={() => {
                        const url = window.location.href;
                        const text = `Check out this amazing tour package: ${tourPackage.title} ${url}`;
                        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors"
                      title="Share on WhatsApp"
                    >
                      <i className="fab fa-whatsapp"></i>
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        toast.success('Link copied to clipboard!');
                      }}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-lg transition-colors"
                      title="Copy Link"
                    >
                      <i className="fas fa-link"></i>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Packages */}
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Other Tour Packages
          </h2>
          <div className="text-center">
            <Button variant="outline" asChild>
              <Link href="/tour-packages">
                View All Packages
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingForm && (
        <BookingModal 
          tourPackage={tourPackage}
          onClose={() => setShowBookingForm(false)}
        />
      )}

      {/* Development Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/90 text-white p-3 rounded-lg text-xs max-w-xs z-50">
          <div className="font-bold mb-2">🐛 Debug Info</div>
          <div className="space-y-1">
            <div>Slug: <span className="text-yellow-300">{slug}</span></div>
            <div>Title: <span className="text-green-300">{tourPackage?.title || 'No title'}</span></div>
            <div>Price: <span className="text-blue-300">{tourPackage?.price ? formatPrice(tourPackage.price) : 'No price'}</span></div>
            <div>Status: <span className="text-purple-300">{tourPackage?.status || 'No status'}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

function BookingModal({ tourPackage, onClose }: { tourPackage: TourPackage; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    participants: 1,
    preferredDate: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi! I'm interested in booking "${tourPackage.title}"\n\nDetails:\n- Name: ${formData.name}\n- Email: ${formData.email}\n- Phone: ${formData.phone}\n- Participants: ${formData.participants}\n- Preferred Date: ${formData.preferredDate}\n- Message: ${formData.message}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Book Package</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900">{tourPackage.title}</h4>
            {tourPackage.price && (
              <div className="text-2xl font-bold text-primary-600 mb-2">
                {formatPrice(tourPackage.price)}
              </div>
            )}
            <p className="text-sm text-gray-600">Duration: {tourPackage.duration || 'Multi-day'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Participants
                </label>
                <select
                  value={formData.participants}
                  onChange={(e) => setFormData({...formData, participants: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Message
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Any special requirements or questions..."
              />
            </div>

            <div className="space-y-3 pt-4">
              <Button type="submit" className="w-full">
                <i className="fab fa-whatsapp mr-2"></i>
                Send via WhatsApp
              </Button>
              <Button type="button" variant="outline" className="w-full" asChild>
                <Link href="/contact">
                  <i className="fas fa-envelope mr-2"></i>
                  Contact Form Instead
                </Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function PackageDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="h-[60vh] bg-gray-300"></div>
      <div className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-lg">
                <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg">
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-12 bg-gray-300 rounded"></div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorState({ error }: { error?: any }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-exclamation-triangle text-3xl text-red-600"></i>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Package Not Available
        </h1>
        <p className="text-gray-600 mb-6">
          We&apos;re having trouble loading this tour package. This might be because the package doesn&apos;t exist or there&apos;s a temporary issue.
        </p>
        
        <div className="space-y-3">
          <Button onClick={() => window.location.reload()} className="w-full">
            <i className="fas fa-redo mr-2"></i>
            Try Again
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/tour-packages">
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Packages
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function NotFoundState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-search text-3xl text-gray-400"></i>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Package Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The tour package you&apos;re looking for doesn&apos;t exist or may have been removed. 
          Let&apos;s help you find another amazing package!
        </p>
        <div className="space-y-3">
          <Button className="w-full" asChild>
            <Link href="/tour-packages">
              <i className="fas fa-suitcase mr-2"></i>
              Browse All Packages
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">
              <i className="fas fa-home mr-2"></i>
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
