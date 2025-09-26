'use client';

import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { endpoint, fetcher } from '@/data/api';
import { TourGrid } from '@/components/tours/TourGrid/TourGrid';
import { Button, Badge } from '@/components/ui';
import { motion } from 'framer-motion';
import { TourPackage } from '@/types';

const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under 1M', min: 0, max: 1000000 },
  { label: '1M - 5M', min: 1000000, max: 5000000 },
  { label: '5M - 10M', min: 5000000, max: 10000000 },
  { label: 'Above 10M', min: 10000000, max: Infinity },
];

const durations = [
  'All Durations',
  '1-2 Days',
  '3-5 Days',
  '6-10 Days',
  '10+ Days',
];

const locations = [
  'All Locations',
  'Raja Ampat',
  'Jayapura',
  'Wamena',
  'Sorong',
  'Manokwari',
  'Nabire',
];

export default function TourPackagesPage() {
  const { data, error, isLoading } = useSWR(endpoint.tourpackages, fetcher);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [selectedDuration, setSelectedDuration] = useState(durations[0]);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [sortBy, setSortBy] = useState('name');

  const packages: TourPackage[] = useMemo(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Tour Packages API Response:', data);
      console.log('🔍 Tour Packages API Error:', error);
      console.log('🔍 Tour Packages API Loading:', isLoading);
      console.log('🔍 API Endpoint:', endpoint.tourpackages);
    }
    
    if (!data?.data?.data) return [];
    return Array.isArray(data.data.data) ? data.data.data : [];
  }, [data, error, isLoading]);

  const filteredPackages = useMemo(() => {
    let filtered = packages.filter((pkg) => {
      // Search filter
      const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (pkg.body && pkg.body.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Price filter - since API doesn&apos;t have price field yet, we&apos;ll skip this for now
      const matchesPrice = selectedPriceRange.label === 'All Prices' || 
                          (pkg.price ? pkg.price >= selectedPriceRange.min && pkg.price <= selectedPriceRange.max : true);
      
      // Duration filter - since API doesn&apos;t have duration field yet, we&apos;ll skip this for now
      const matchesDuration = selectedDuration === 'All Durations' || 
                             (pkg.duration ? pkg.duration.includes(selectedDuration.split(' ')[0]) : true);
      
      // Location filter - since API doesn&apos;t have location field yet, we&apos;ll skip this for now
      const matchesLocation = selectedLocation === 'All Locations' || 
                             (pkg.location ? pkg.location.includes(selectedLocation) : true);

      return matchesSearch && matchesPrice && matchesDuration && matchesLocation;
    });

    // Sort packages
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'name':
          return a.title.localeCompare(b.title);
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [packages, searchTerm, selectedPriceRange, selectedDuration, selectedLocation, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedPriceRange(priceRanges[0]);
    setSelectedDuration(durations[0]);
    setSelectedLocation(locations[0]);
    setSortBy('name');
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            We&apos;re having trouble loading the tour packages. Please try again later.
          </p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Explore Papua Tour Packages
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover carefully curated tour packages that showcase the best of Papua&apos;s 
              natural beauty, rich culture, and unforgettable adventures.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <i className="fas fa-map-marked-alt"></i>
                <span>{packages.length} Packages Available</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-star"></i>
                <span>Expert Local Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-shield-alt"></i>
                <span>Safe & Secure</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b py-6">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search tour packages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              {/* Price Range */}
              <select
                value={selectedPriceRange.label}
                onChange={(e) => {
                  const range = priceRanges.find(r => r.label === e.target.value);
                  if (range) setSelectedPriceRange(range);
                }}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {priceRanges.map((range) => (
                  <option key={range.label} value={range.label}>
                    {range.label}
                  </option>
                ))}
              </select>

              {/* Duration */}
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {durations.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration}
                  </option>
                ))}
              </select>

              {/* Location */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="name">Sort by Name</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              {/* Clear Filters */}
              <Button variant="outline" onClick={clearFilters}>
                <i className="fas fa-times mr-2"></i>
                Clear
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {searchTerm && (
              <Badge variant="primary">
                Search: {searchTerm}
                <button
                  onClick={() => setSearchTerm('')}
                  className="ml-2 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedPriceRange.label !== 'All Prices' && (
              <Badge variant="secondary">
                {selectedPriceRange.label}
                <button
                  onClick={() => setSelectedPriceRange(priceRanges[0])}
                  className="ml-2 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedDuration !== 'All Durations' && (
              <Badge variant="success">
                {selectedDuration}
                <button
                  onClick={() => setSelectedDuration(durations[0])}
                  className="ml-2 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedLocation !== 'All Locations' && (
              <Badge variant="warning">
                {selectedLocation}
                <button
                  onClick={() => setSelectedLocation(locations[0])}
                  className="ml-2 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section-padding">
        <div className="container">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredPackages.length} Tour Packages Found
              </h2>
              <p className="text-gray-600 mt-1">
                Showing results for your search criteria
              </p>
            </div>
          </div>

          {/* Tour Grid */}
          <TourGrid
            tours={filteredPackages}
            type="package"
            loading={isLoading}
            columns={3}
          />

          {/* No Results */}
          {!isLoading && filteredPackages.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-search text-3xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No tour packages found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse all packages
              </p>
              <Button onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
