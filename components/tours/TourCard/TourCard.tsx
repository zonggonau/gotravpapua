'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, Badge } from '@/components/ui';
import { formatDate, truncateText, generateImageUrl, getCleanText, formatPrice } from '@/lib/utils';
import { TourPackage, TourDestination, TourAdventure, TourEvent } from '@/types';

type TourItem = TourPackage | TourDestination | TourAdventure | TourEvent;

interface TourCardProps {
  tour: TourItem;
  type: 'package' | 'destination' | 'adventure' | 'event';
  className?: string;
}

export function TourCard({ tour, type, className }: TourCardProps) {
  const getTypeColor = () => {
    switch (type) {
      case 'package': return 'primary';
      case 'destination': return 'secondary';
      case 'adventure': return 'success';
      case 'event': return 'warning';
      default: return 'default';
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'package': return 'Tour Package';
      case 'destination': return 'Destination';
      case 'adventure': return 'Adventure';
      case 'event': return 'Event';
      default: return 'Tour';
    }
  };

  const getHref = () => {
    switch (type) {
      case 'package': return `/tour-packages/${tour.slug}`;
      case 'destination': return `/tour-destinations/${tour.slug}`;
      case 'adventure': return `/tour-adventures/${tour.slug}`;
      case 'event': return `/tour-events/${tour.slug}`;
      default: return '#';
    }
  };

  const hasPrice = 'price' in tour;
  const hasDuration = 'duration' in tour;
  const hasLocation = 'location' in tour;
  const hasEventDate = 'event_date' in tour;
  const hasDifficulty = 'difficulty_level' in tour;

  return (
    <Card variant="elevated" padding="none" className={className}>
      <Link href={getHref()} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
          <Image
            src={generateImageUrl(tour.picture)}
            alt={tour.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Type Badge */}
          <div className="absolute top-3 left-3">
            <Badge variant={getTypeColor() as any} size="sm">
              {getTypeLabel()}
            </Badge>
          </div>

          {/* Difficulty Badge for Adventures */}
          {hasDifficulty && (
            <div className="absolute top-3 right-3">
              <Badge 
                variant={
                  (tour as TourAdventure).difficulty_level === 'easy' ? 'success' :
                  (tour as TourAdventure).difficulty_level === 'medium' ? 'warning' :
                  (tour as TourAdventure).difficulty_level === 'hard' ? 'error' : 'default'
                } 
                size="sm"
              >
                {(tour as TourAdventure).difficulty_level}
              </Badge>
            </div>
          )}

          {/* Price Badge for Packages/Events */}
          {hasPrice && 'price' in tour && tour.price && (
            <div className="absolute bottom-3 right-3">
              <Badge variant="default" size="sm" className="bg-white/90 text-gray-900">
                {formatPrice(tour.price)}
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
              {tour.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {getCleanText(tour.description || (tour as any).body || '', 100)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            {hasLocation && (
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{(tour as any).location}</span>
              </div>
            )}
            
            {hasDuration && (
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>{(tour as any).duration}</span>
              </div>
            )}

            {hasEventDate && (
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span>{new Date(tour.created_at).toLocaleDateString('id-ID')}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
