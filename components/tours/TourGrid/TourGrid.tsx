'use client';

import { TourCard } from '../TourCard/TourCard';
import { SkeletonCard } from '@/components/ui';
import { TourPackage, TourDestination, TourAdventure, TourEvent } from '@/types';

type TourItem = TourPackage | TourDestination | TourAdventure | TourEvent;

interface TourGridProps {
  tours: TourItem[];
  type: 'package' | 'destination' | 'adventure' | 'event';
  loading?: boolean;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function TourGrid({ 
  tours, 
  type, 
  loading = false, 
  columns = 3,
  className = '' 
}: TourGridProps) {
  const getGridCols = () => {
    switch (columns) {
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  if (loading) {
    return (
      <div className={`grid ${getGridCols()} gap-6 ${className}`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!tours.length) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20.5a7.962 7.962 0 01-5-1.709M15 3.5a7.966 7.966 0 00-6 2.709A7.966 7.966 0 003 3.5v10A7.963 7.963 0 009 20.5" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No {type}s found
        </h3>
        <p className="text-gray-600">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${getGridCols()} gap-6 ${className}`}>
      {tours.map((tour, index) => (
        <TourCard
          key={tour.id || index}
          tour={tour}
          type={type}
          className="h-full"
        />
      ))}
    </div>
  );
}
