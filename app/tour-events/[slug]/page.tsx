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
import { TourEvent } from '@/types';
import { toast } from 'react-toastify';

export default function EventDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Debug logging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Event Detail Debug:', {
        params,
        slug,
        endpoint: endpoint.tourevents,
        fullUrl: slug ? `${endpoint.tourevents}/${slug}` : 'No slug'
      });
    }
  }, [params, slug]);

  const { data, error, isLoading } = useSWR(
    slug ? `${endpoint.tourevents}/${slug}` : null,
    async (url) => {
      try {
        // First try the direct slug endpoint
        const response = await fetcher(url);
        
        // Handle paginated response - look for the specific event in the data array
        if (response?.data?.data && Array.isArray(response.data.data)) {
          const event = response.data.data.find((item: any) => item.slug === slug);
          if (event) {
            return { data: event };
          }
        }
        
        // If direct response has the event data
        if (response?.data && !Array.isArray(response.data)) {
          return response;
        }
        
        return response;
      } catch (error) {
        // Last resort: get all events and find the one with matching slug
        console.log('Trying to find event in full list...');
        const allEvents = await fetcher(endpoint.tourevents);
        if (allEvents?.data?.data && Array.isArray(allEvents.data.data)) {
          const event = allEvents.data.data.find((item: any) => item.slug === slug);
          if (event) {
            return { data: event };
          }
        }
        throw error;
      }
    },
    {
      onSuccess: (data) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Event data loaded:', data);
        }
      },
      onError: (error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ Event loading failed:', error);
        }
        toast.error('Failed to load event details');
      }
    }
  );

  // Loading state
  if (isLoading) {
    return <EventDetailSkeleton />;
  }
  
  // Error state
  if (error) {
    return <ErrorState error={error} />;
  }
  
  // Not found state - check multiple data structures
  const eventData = data?.data || data;
  if (!eventData) {
    return <NotFoundState />;
  }

  const event: TourEvent = eventData;
  const images = [event.picture];

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
            <Link href="/tour-events" className="text-gray-500 hover:text-primary-600">
              Events
            </Link>
            <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
            <span className="text-gray-900 font-medium">{event.title}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src={generateImageUrl(images[selectedImageIndex])}
          alt={event.title}
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
                  <i className="fas fa-calendar-alt mr-2"></i>
                  Cultural Event
                </Badge>
                <Badge variant="outline" className="text-white border-white">
                  <i className="fas fa-user mr-2"></i>
                  {event.user?.name || 'GoTrav Papua'}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {event.title}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                {getCleanText(event.description || event.body || '', 200)}
              </p>
              <div className="text-lg text-white/80">
                <i className="fas fa-calendar mr-2"></i>
                {formatDate(event.created_at)}
              </div>
            </motion.div>
          </div>
        </div>
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
                  <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                  <div className="prose max-w-none">
                    <div 
                      className="text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: event.body || event.description }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Event Details */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Event Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-calendar-alt text-primary-600 w-5"></i>
                      <div>
                        <div className="font-medium">Event Date</div>
                        <div className="text-gray-600">{formatDate(event.created_at)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-user text-primary-600 w-5"></i>
                      <div>
                        <div className="font-medium">Organizer</div>
                        <div className="text-gray-600">{event.user?.name || 'GoTrav Papua'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-tag text-primary-600 w-5"></i>
                      <div>
                        <div className="font-medium">Status</div>
                        <div className="text-gray-600">{event.status}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-clock text-primary-600 w-5"></i>
                      <div>
                        <div className="font-medium">Last Updated</div>
                        <div className="text-gray-600">{formatDate(event.updated_at)}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <Card className="sticky top-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Join This Event</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Event Type</span>
                      <span className="font-medium">Cultural Festival</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Organizer</span>
                      <span className="font-medium">{event.user?.name || 'GoTrav Papua'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Status</span>
                      <Badge variant="success">{event.status}</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => setShowBookingForm(true)}
                    >
                      Get Information
                      <i className="fas fa-info-circle ml-2"></i>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/contact">
                        Contact Us
                        <i className="fas fa-envelope ml-2"></i>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Event Highlights</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-users text-primary-600 w-4"></i>
                      <span>Cultural experience</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-music text-primary-600 w-4"></i>
                      <span>Traditional performances</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-camera text-primary-600 w-4"></i>
                      <span>Photo opportunities</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-heart text-primary-600 w-4"></i>
                      <span>Support local culture</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Share */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Share This Event</h3>
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
                        const text = `Check out this amazing event: ${event.title}`;
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
                        const text = `Check out this amazing event: ${event.title} ${url}`;
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

      {/* Related Events */}
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            More Events You Might Like
          </h2>
          <div className="text-center">
            <Button variant="outline" asChild>
              <Link href="/tour-events">
                View All Events
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingForm && (
        <BookingModal 
          event={event}
          onClose={() => setShowBookingForm(false)}
        />
      )}

      {/* Development Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/90 text-white p-3 rounded-lg text-xs max-w-xs z-50">
          <div className="font-bold mb-2">🐛 Debug Info</div>
          <div className="space-y-1">
            <div>Slug: <span className="text-yellow-300">{slug}</span></div>
            <div>Title: <span className="text-green-300">{event?.title || 'No title'}</span></div>
            <div>Status: <span className="text-blue-300">{event?.status || 'No status'}</span></div>
            <div>User: <span className="text-purple-300">{event?.user?.name || 'No user'}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

function BookingModal({ event, onClose }: { event: TourEvent; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi! I'm interested in "${event.title}"\n\nDetails:\n- Name: ${formData.name}\n- Email: ${formData.email}\n- Phone: ${formData.phone}\n- Message: ${formData.message}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Event Information</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900">{event.title}</h4>
            <p className="text-sm text-gray-600">Status: {event.status}</p>
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
                Message
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Tell us about your interest in this event..."
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

function EventDetailSkeleton() {
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
          Event Not Available
        </h1>
        <p className="text-gray-600 mb-6">
          We&apos;re having trouble loading this event. This might be because the event doesn&apos;t exist or there&apos;s a temporary issue.
        </p>
        
        <div className="space-y-3">
          <Button onClick={() => window.location.reload()} className="w-full">
            <i className="fas fa-redo mr-2"></i>
            Try Again
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/tour-events">
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Events
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
          Event Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The event you&apos;re looking for doesn&apos;t exist or may have been removed. 
          Let&apos;s help you find another amazing event!
        </p>
        <div className="space-y-3">
          <Button className="w-full" asChild>
            <Link href="/tour-events">
              <i className="fas fa-calendar-alt mr-2"></i>
              Browse All Events
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
