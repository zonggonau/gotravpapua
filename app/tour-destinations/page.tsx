'use client';

import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { endpoint, fetcher } from '@/data/api';
import { TourGrid } from '@/components/tours/TourGrid/TourGrid';
import { Button, Badge } from '@/components/ui';
import { motion } from 'framer-motion';
import { TourDestination } from '@/types';

const categories = [
  'All Categories',
  'Beach & Islands',
  'Mountains & Hills',
  'Cultural Sites',
  'National Parks',
  'Diving Spots',
  'Wildlife Areas',
];

const regions = [
  'All Regions',
  'Raja Ampat',
  'Jayapura',
  'Wamena',
  'Sorong',
  'Manokwari',
  'Nabire',
  'Merauke',
];

export default function DestinationsPage() {
  const { data, error, isLoading } = useSWR(endpoint.tourdestinations, fetcher);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [sortBy, setSortBy] = useState('name');

  const destinations: TourDestination[] = useMemo(() => {
    if (!data?.data?.data) return [];
    return Array.isArray(data.data.data) ? data.data.data : [];
  }, [data]);

  const filteredDestinations = useMemo(() => {
    let filtered = destinations.filter((dest) => {
      // Search filter
      const matchesSearch = dest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (dest.location && dest.location.toLowerCase().includes(searchTerm.toLowerCase()));
      // Category filter (based on title/description keywords)
      const matchesCategory = selectedCategory === 'All Categories' || 
                             dest.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                             dest.description?.toLowerCase().includes(selectedCategory.toLowerCase());
      

      return matchesSearch && matchesCategory;
    });

    // Sort destinations
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'location':
          return (a.location || '').localeCompare(b.location || '');
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [destinations, searchTerm, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(categories[0]);
    setSelectedRegion(regions[0]);
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
            We&apos;re having trouble loading the destinations. Please try again later.
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
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Papua Destinations
            </h1>
            <p className="text-xl text-white/90 mb-8">
              From pristine beaches and coral reefs to ancient cultural sites and lush rainforests, 
              explore the most breathtaking destinations Papua has to offer.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <i className="fas fa-map-marked-alt"></i>
                <span>{destinations.length} Destinations</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-camera"></i>
                <span>Photo Opportunities</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-leaf"></i>
                <span>Eco-Friendly</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category)}
                className={`p-4 rounded-xl text-center transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary-100 text-primary-700 border-2 border-primary-300'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="text-2xl mb-2">
                  {category === 'Beach & Islands' && '🏝️'}
                  {category === 'Mountains & Hills' && '⛰️'}
                  {category === 'Cultural Sites' && '🏛️'}
                  {category === 'National Parks' && '🌲'}
                  {category === 'Diving Spots' && '🤿'}
                  {category === 'Wildlife Areas' && '🦋'}
                </div>
                <div className="text-sm font-medium">{category}</div>
              </motion.button>
            ))}
          </div>
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
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              {/* Region */}
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
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
                <option value="location">Sort by Location</option>
                <option value="newest">Newest First</option>
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
            {selectedCategory !== 'All Categories' && (
              <Badge variant="secondary">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory(categories[0])}
                  className="ml-2 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedRegion !== 'All Regions' && (
              <Badge variant="success">
                {selectedRegion}
                <button
                  onClick={() => setSelectedRegion(regions[0])}
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
                {filteredDestinations.length} Destinations Found
              </h2>
              <p className="text-gray-600 mt-1">
                Discover amazing places in Papua
              </p>
            </div>
          </div>

          {/* Destinations Grid */}
          <TourGrid
            tours={filteredDestinations}
            type="destination"
            loading={isLoading}
            columns={3}
          />

          {/* No Results */}
          {!isLoading && filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-map-marked-alt text-3xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No destinations found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse all destinations
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
