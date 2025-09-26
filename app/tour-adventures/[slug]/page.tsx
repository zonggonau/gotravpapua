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
import { TourAdventure } from '@/types';
import { toast } from 'react-toastify';

const difficultyConfig = {
  easy: { color: 'bg-green-100 text-green-700', icon: '🟢', label: 'Easy' },
  medium: { color: 'bg-yellow-100 text-yellow-700', icon: '🟡', label: 'Medium' },
  hard: { color: 'bg-orange-100 text-orange-700', icon: '🟠', label: 'Hard' },
  extreme: { color: 'bg-red-100 text-red-700', icon: '🔴', label: 'Extreme' },
};

export default function AdventureDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Debug logging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Adventure Detail Debug:', {
        params,
        slug,
        endpoint: endpoint.touradventures,
        fullUrl: slug ? `${endpoint.touradventures}/${slug}` : 'No slug'
      });
    }
  }, [params, slug]);

  // Try different API endpoint formats
  const apiUrl = slug ? `${endpoint.touradventures}/${slug}` : null;
  const detailApiUrl = slug ? `${endpoint.touradventures}/${slug}/detail` : null;

  const { data, error, isLoading } = useSWR(
    apiUrl,
    async (url) => {
      try {
        // First try the direct slug endpoint
        const response = await fetcher(url);
        
        // Handle paginated response - look for the specific adventure in the data array
        if (response?.data?.data && Array.isArray(response.data.data)) {
          const adventure = response.data.data.find((item: any) => item.slug === slug);
          if (adventure) {
            return { data: adventure };
          }
        }
        
        // If direct response has the adventure data
        if (response?.data && !Array.isArray(response.data)) {
          return response;
        }
        
        return response;
      } catch (error) {
        // If that fails, try with /detail suffix
        if (slug) {
          try {
            console.log('Trying detail endpoint:', detailApiUrl);
            return await fetcher(detailApiUrl!);
          } catch (detailError) {
            // Last resort: get all adventures and find the one with matching slug
            console.log('Trying to find adventure in full list...');
            const allAdventures = await fetcher(endpoint.touradventures);
            if (allAdventures?.data?.data && Array.isArray(allAdventures.data.data)) {
              const adventure = allAdventures.data.data.find((item: any) => item.slug === slug);
              if (adventure) {
                return { data: adventure };
              }
            }
          }
        }
        throw error;
      }
    },
    {
      onSuccess: (data) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Adventure data loaded:', data);
          console.log('📊 Data structure:', {
            hasData: !!data?.data,
            dataKeys: data ? Object.keys(data) : [],
            adventureKeys: data?.data ? Object.keys(data.data) : [],
            fullData: data
          });
        }
      },
      onError: (error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ Adventure loading failed:', error);
          console.error('Tried URLs:', [apiUrl, detailApiUrl]);
        }
        toast.error('Failed to load adventure details');
      }
    }
  );

  // Loading state
  if (isLoading) {
    return <AdventureDetailSkeleton />;
  }
  
  // Error state
  if (error) {
    return <ErrorState error={error} />;
  }
  
  // Not found state - check multiple data structures
  const adventureData = data?.data || data;
  if (!adventureData) {
    return <NotFoundState />;
  }

  const adventure: TourAdventure = adventureData;
  const difficulty = difficultyConfig[adventure?.difficulty_level] || difficultyConfig.easy;
  const images = adventure?.gallery || (adventure?.picture ? [adventure.picture] : ['/assets/images/placeholder.jpg']);

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
            <Link href="/tour-adventures" className="text-gray-500 hover:text-primary-600">
              Adventures
            </Link>
            <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
            <span className="text-gray-900 font-medium">{adventure.title}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src={generateImageUrl(images[selectedImageIndex])}
          alt={adventure.title}
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
                <Badge className={`${difficulty.color} border-0`}>
                  {difficulty.icon} {difficulty.label}
                </Badge>
                <Badge variant="outline" className="text-white border-white">
                  <i className="fas fa-clock mr-2"></i>
                  {adventure.duration}
                </Badge>
                <Badge variant="outline" className="text-white border-white">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  {adventure.location}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {adventure.title}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                {getCleanText(adventure.description || adventure.body || '', 200)}
              </p>
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
                  <h2 className="text-2xl font-bold mb-4">About This Adventure</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-600 leading-relaxed">
                      {adventure.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Equipment Needed */}
              {adventure.equipment_needed && adventure.equipment_needed.length > 0 && (
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">Equipment Needed</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {adventure.equipment_needed.map((equipment, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <i className="fas fa-check-circle text-green-500"></i>
                          <span>{equipment}</span>
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
                            alt={`${adventure.title} ${index + 1}`}
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
                  <h3 className="text-xl font-bold mb-4">Book This Adventure</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Difficulty</span>
                      <Badge className={difficulty.color}>
                        {difficulty.icon} {difficulty.label}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{adventure.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Location</span>
                      <span className="font-medium">{adventure.location}</span>
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
                        Ask Questions
                        <i className="fas fa-question-circle ml-2"></i>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Quick Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-users text-primary-600 w-4"></i>
                      <span>Small group experience</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-shield-alt text-primary-600 w-4"></i>
                      <span>Safety equipment provided</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-camera text-primary-600 w-4"></i>
                      <span>Photo opportunities</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-leaf text-primary-600 w-4"></i>
                      <span>Eco-friendly tour</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Share */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Share This Adventure</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        const url = window.location.href;
                        const text = `Check out this amazing adventure: ${adventure.title}`;
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
                        const text = `Check out this amazing adventure: ${adventure.title}`;
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
                        const text = `Check out this amazing adventure: ${adventure.title} ${url}`;
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

      {/* Related Adventures */}
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            More Adventures You Might Like
          </h2>
          <div className="text-center">
            <Button variant="outline" asChild>
              <Link href="/tour-adventures">
                View All Adventures
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingForm && (
        <BookingModal 
          adventure={adventure}
          onClose={() => setShowBookingForm(false)}
        />
      )}

      {/* Development Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/90 text-white p-3 rounded-lg text-xs max-w-xs z-50">
          <div className="font-bold mb-2">🐛 Debug Info</div>
          <div className="space-y-1">
            <div>Slug: <span className="text-yellow-300">{slug}</span></div>
            <div>API URL: <span className="text-cyan-300">{apiUrl?.substring(0, 50)}...</span></div>
            <div>Detail URL: <span className="text-orange-300">{detailApiUrl?.substring(0, 50)}...</span></div>
            <div>Has Data: <span className="text-green-300">{data ? 'Yes' : 'No'}</span></div>
            <div>Data Keys: <span className="text-purple-300">{data ? Object.keys(data).join(', ') : 'None'}</span></div>
            <div>Title: <span className="text-green-300">{adventure?.title || 'No title'}</span></div>
            <div>Difficulty: <span className="text-blue-300">{adventure?.difficulty_level || 'No difficulty'}</span></div>
            <div>Images: <span className="text-purple-300">{images?.length || 0}</span></div>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-600 space-y-1">
            <button
              onClick={() => {
                console.log('Full API Debug:', {
                  slug,
                  apiUrl,
                  detailApiUrl,
                  endpoint: endpoint.touradventures,
                  data,
                  adventure
                });
              }}
              className="w-full text-xs bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
            >
              Log Full Debug
            </button>
            <button
              onClick={async () => {
                const { testSpecificAdventure } = await import('@/lib/test-api');
                if (slug) {
                  await testSpecificAdventure(slug);
                }
              }}
              className="w-full text-xs bg-green-600 px-2 py-1 rounded hover:bg-green-700"
            >
              Test This Adventure
            </button>
            <button
              onClick={async () => {
                const { testApiEndpoints } = await import('@/lib/test-api');
                await testApiEndpoints();
              }}
              className="w-full text-xs bg-orange-600 px-2 py-1 rounded hover:bg-orange-700"
            >
              Test All APIs
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function BookingModal({ adventure, onClose }: { adventure: TourAdventure; onClose: () => void }) {
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
    const message = `Hi! I'm interested in booking "${adventure.title}"\n\nDetails:\n- Name: ${formData.name}\n- Email: ${formData.email}\n- Phone: ${formData.phone}\n- Participants: ${formData.participants}\n- Preferred Date: ${formData.preferredDate}\n- Message: ${formData.message}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Book Adventure</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900">{adventure.title}</h4>
            <p className="text-sm text-gray-600">Difficulty: {adventure.difficulty_level}</p>
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

function AdventureDetailSkeleton() {
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
          Adventure Not Available
        </h1>
        <p className="text-gray-600 mb-6">
          We&apos;re having trouble loading this adventure. This might be because the adventure doesn&apos;t exist or there&apos;s a temporary issue.
        </p>
        
        {process.env.NODE_ENV === 'development' && error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-red-800 mb-2">Debug Information:</h3>
            <div className="text-sm text-red-700 space-y-1">
              <div><strong>Error:</strong> {error.message || 'Unknown error'}</div>
              <div><strong>Status:</strong> {error.status || 'N/A'}</div>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          <Button onClick={() => window.location.reload()} className="w-full">
            <i className="fas fa-redo mr-2"></i>
            Try Again
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/tour-adventures">
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Adventures
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
          Adventure Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The adventure you&apos;re looking for doesn&apos;t exist or may have been removed. 
          Let&apos;s help you find another amazing adventure!
        </p>
        <div className="space-y-3">
          <Button className="w-full" asChild>
            <Link href="/tour-adventures">
              <i className="fas fa-mountain mr-2"></i>
              Browse All Adventures
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
