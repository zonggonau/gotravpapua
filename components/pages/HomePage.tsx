'use client';

import { Suspense } from 'react';
import {
  About,
  Adventures,
  TourPackages,
} from "@/components";
import HeroCarousel from "@/components/hero";
import { useHeaderData } from '@/hooks/useHeaderData';

// Loading components
function HeroSkeleton() {
  return (
    <div className="h-screen bg-gray-200 animate-pulse flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl space-y-6">
          <div className="h-16 bg-gray-300 rounded-lg w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
}

function SectionSkeleton() {
  return (
    <div className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Cache status indicator (for development)
function CacheStatus({ isLoading, isValidating, error }: { 
  isLoading: boolean; 
  isValidating: boolean; 
  error: any; 
}) {
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-white shadow-lg rounded-lg p-3 text-xs">
      <div className="space-y-1">
        <div className={`flex items-center gap-2 ${isLoading ? 'text-orange-600' : 'text-gray-600'}`}>
          <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
          Loading: {isLoading ? 'Yes' : 'No'}
        </div>
        <div className={`flex items-center gap-2 ${isValidating ? 'text-blue-600' : 'text-gray-600'}`}>
          <div className={`w-2 h-2 rounded-full ${isValidating ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
          Validating: {isValidating ? 'Yes' : 'No'}
        </div>
        <div className={`flex items-center gap-2 ${error ? 'text-red-600' : 'text-green-600'}`}>
          <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-500' : 'bg-green-500'}`}></div>
          Status: {error ? 'Error' : 'OK'}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { 
    sliders, 
    adventures, 
    tours, 
    isLoading, 
    isValidating, 
    error, 
    refreshAll 
  } = useHeaderData();

  // Show error state
  if (error && !sliders.length && !adventures.length && !tours.length) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600">
            We&apos;re having trouble loading the page. Please try again later.
          </p>
          <button 
            onClick={refreshAll}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* Cache Status Indicator (Development Only) */}
      <CacheStatus isLoading={isLoading} isValidating={isValidating} error={error} />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <Suspense fallback={<HeroSkeleton />}>
          {isLoading && !sliders.length ? (
            <HeroSkeleton />
          ) : (
            <HeroCarousel data={sliders} />
          )}
        </Suspense>

        {/* About Section */}
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>

        {/* Adventures Section */}
        <Suspense fallback={<SectionSkeleton />}>
          {isLoading && !adventures.length ? (
            <SectionSkeleton />
          ) : (
            <Adventures data={adventures} />
          )}
        </Suspense>

        {/* Tour Packages Section */}
        <Suspense fallback={<SectionSkeleton />}>
          {isLoading && !tours.length ? (
            <SectionSkeleton />
          ) : (
            <TourPackages data={tours} />
          )}
        </Suspense>

        {/* Background refresh indicator */}
        {isValidating && (
          <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Updating data...
            </div>
          </div>
        )}
      </main>
    </>
  );
}
