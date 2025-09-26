'use client';

import { TourGrid } from '../TourGrid/TourGrid';
import { Button } from '@/components/ui';
import { TourPackage } from '@/types';
import Link from 'next/link';

interface TourPackagesProps {
  data: TourPackage[] | { data: TourPackage[] } | any;
  showAll?: boolean;
  limit?: number;
}

export function TourPackages({ data, showAll = false, limit = 6 }: TourPackagesProps) {
  // Normalize API response shape to an array
  const items = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
    ? data.data
    : [];
  
  const displayData = showAll ? items : items.slice(0, limit);

  return (
    <section id="tour-packages" className="section-padding bg-gray-50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="heading-primary mb-4">Tour Packages</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed">
              Discover the untouched beauty of Papua with our carefully curated tour packages. 
              From Papuan Paradise Expeditions to Cultural Immersion experiences, each journey 
              offers unique adventures through pristine landscapes and vibrant local cultures.
            </p>
          </div>
        </div>

        {/* Tour Grid */}
        <TourGrid 
          tours={displayData} 
          type="package" 
          columns={3}
          className="mb-12"
        />

        {/* Call to Action */}
        {!showAll && items.length > limit && (
          <div className="text-center">
            <div className="max-w-2xl mx-auto mb-8">
              <p className="text-gray-600 mb-6">
                Discover a land of awe-inspiring mountains, dense rainforests, and vibrant wildlife, 
                while forging connections with the warm-hearted locals and gaining a deeper understanding 
                of humanity&apos;s rich tapestry.
              </p>
            </div>
            <Link href="/tour-packages">
              <Button size="lg" className="group">
                More Tour Packages
                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
