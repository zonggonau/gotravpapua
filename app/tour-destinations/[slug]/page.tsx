'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { endpoint, fetcher } from '@/data/api';
import { Button, Badge, Card, CardContent } from '@/components/ui';
import { formatDate, generateImageUrl, getCleanText } from '@/lib/utils';
import { TourDestination } from '@/types';
import { toast } from 'react-toastify';

export default function DestinationDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Debug logging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Destination Detail Debug:', {
        params,
        slug,
        endpoint: endpoint.tourdestinations,
        fullUrl: slug ? `${endpoint.tourdestinations}/${slug}` : 'No slug'
      });
    }
  }, [params, slug]);

  const { data, error, isLoading } = useSWR(
    slug ? `${endpoint.tourdestinations}/${slug}` : null,
    async (url) => {
      try {
        // First try the direct slug endpoint
        const response = await fetcher(url);
        
        // Handle paginated response - look for the specific destination in the data array
        if (response?.data?.data && Array.isArray(response.data.data)) {
          const destination = response.data.data.find((item: any) => item.slug === slug);
          if (destination) {
            return { data: destination };
          }
        }
        
        // If direct response has the destination data
        if (response?.data && !Array.isArray(response.data)) {
          return response;
        }
        
        return response;
      } catch (error) {
        // Last resort: get all destinations and find the one with matching slug
        console.log('Trying to find destination in full list...');
        const allDestinations = await fetcher(endpoint.tourdestinations);
        if (allDestinations?.data?.data && Array.isArray(allDestinations.data.data)) {
          const destination = allDestinations.data.data.find((item: any) => item.slug === slug);
          if (destination) {
            return { data: destination };
          }
        }
        throw error;
      }
    },
    {
      onSuccess: (data) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Destination data loaded:', data);
        }
      },
      onError: (error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ Destination loading failed:', error);
        }
        toast.error('Failed to load destination details');
      }
    }
  );

  // Loading state
  if (isLoading) {
    return <DestinationDetailSkeleton />;
  }
  
  // Error state
  if (error) {
    return <ErrorState error={error} />;
  }
  
  // Not found state - check multiple data structures
  const destinationData = data?.data || data;
  if (!destinationData) {
    return <NotFoundState />;
  }

  const destination: TourDestination = destinationData;
  const images = destination.gallery || [destination.picture];

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
            <Link href="/tour-destinations" className="text-gray-500 hover:text-primary-600">
              Destinations
            </Link>
            <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
            <span className="text-gray-900 font-medium">{destination.title}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src={generateImageUrl(images[selectedImageIndex])}
          alt={destination.title}
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
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  Destination
                </Badge>
                <Badge variant="outline" className="text-white border-white">
                  <i className="fas fa-camera mr-2"></i>
                  Photo Spot
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {destination.title}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                {getCleanText(destination.description || destination.body || '', 200)}
              </p>
              <div className="text-lg text-white/80">
                <i className="fas fa-map-marker-alt mr-2"></i>
                {destination.location || 'Papua, Indonesia'}
              </div>
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
                  <h2 className="text-2xl font-bold mb-4">About This Destination</h2>
                  <div className="prose max-w-none">
                    <div 
                      className="text-gray-600 leading-relaxed prose-sm prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-800"
                      dangerouslySetInnerHTML={{ __html: destination.body || destination.description }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Attractions */}
              {destination.attractions && destination.attractions.length > 0 && (
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">Main Attractions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {destination.attractions.map((attraction, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <i className="fas fa-star text-yellow-500"></i>
                          <span>{attraction}</span>
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
                            alt={`${destination.title} ${index + 1}`}
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
                  <h3 className="text-xl font-bold mb-4">Visit This Destination</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Type</span>
                      <span className="font-medium">Tourist Destination</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Location</span>
                      <span className="font-medium">{destination.location || 'Papua'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Best Time</span>
                      <span className="font-medium">Year Round</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => setShowBookingForm(true)}
                    >
                      Plan Your Visit
                      <i className="fas fa-map ml-2"></i>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/contact">
                        Get Information
                        <i className="fas fa-info-circle ml-2"></i>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Destination Highlights</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-camera text-primary-600 w-4"></i>
                      <span>Perfect for photography</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-hiking text-primary-600 w-4"></i>
                      <span>Nature exploration</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-water text-primary-600 w-4"></i>
                      <span>Marine biodiversity</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-leaf text-primary-600 w-4"></i>
                      <span>Eco-friendly tourism</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Share */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Share This Destination</h3>
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
                        const text = `Check out this amazing destination: ${destination.title}`;
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
                        const text = `Check out this amazing destination: ${destination.title} ${url}`;
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

      {/* Related Destinations */}
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            More Destinations You Might Like
          </h2>
          <div className="text-center">
            <Button variant="outline" asChild>
              <Link href="/tour-destinations">
                View All Destinations
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingForm && (
        <BookingModal 
          destination={destination}
          onClose={() => setShowBookingForm(false)}
        />
      )}

      {/* Development Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/90 text-white p-3 rounded-lg text-xs max-w-xs z-50">
          <div className="font-bold mb-2">🐛 Debug Info</div>
          <div className="space-y-1">
            <div>Slug: <span className="text-yellow-300">{slug}</span></div>
            <div>Title: <span className="text-green-300">{destination?.title || 'No title'}</span></div>
            <div>Location: <span className="text-blue-300">{destination?.location || 'No location'}</span></div>
            <div>Images: <span className="text-purple-300">{images?.length || 0}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

function BookingModal({ destination, onClose }: { destination: TourDestination; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    visitDate: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi! I'm interested in visiting "${destination.title}"\n\nDetails:\n- Name: ${formData.name}\n- Email: ${formData.email}\n- Phone: ${formData.phone}\n- Preferred Visit Date: ${formData.visitDate}\n- Message: ${formData.message}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Plan Your Visit</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900">{destination.title}</h4>
            <p className="text-sm text-gray-600">Location: {destination.location || 'Papua'}</p>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Visit Date
              </label>
              <input
                type="date"
                value={formData.visitDate}
                onChange={(e) => setFormData({...formData, visitDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
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
                placeholder="Tell us about your travel plans..."
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

function DestinationDetailSkeleton() {
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
          Destination Not Available
        </h1>
        <p className="text-gray-600 mb-6">
          We&apos;re having trouble loading this destination. This might be because the destination doesn&apos;t exist or there&apos;s a temporary issue.
        </p>
        
        <div className="space-y-3">
          <Button onClick={() => window.location.reload()} className="w-full">
            <i className="fas fa-redo mr-2"></i>
            Try Again
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/tour-destinations">
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Destinations
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
          Destination Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The destination you&apos;re looking for doesn&apos;t exist or may have been removed. 
          Let&apos;s help you find another amazing destination!
        </p>
        <div className="space-y-3">
          <Button className="w-full" asChild>
            <Link href="/tour-destinations">
              <i className="fas fa-map-marker-alt mr-2"></i>
              Browse All Destinations
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
