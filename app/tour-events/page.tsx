'use client';

import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { endpoint, fetcher } from '@/data/api';
import { TourGrid } from '@/components/tours/TourGrid/TourGrid';
import { Button, Badge } from '@/components/ui';
import { motion } from 'framer-motion';
import { TourEvent } from '@/types';

const eventTypes = [
  'All Events',
  'Cultural Festival',
  'Music & Arts',
  'Food & Culinary',
  'Sports & Adventure',
  'Religious Ceremony',
  'Traditional Dance',
];

const timeFilters = [
  { value: 'all', label: 'All Time' },
  { value: 'upcoming', label: 'Upcoming Events' },
  { value: 'this-month', label: 'This Month' },
  { value: 'next-month', label: 'Next Month' },
  { value: 'this-year', label: 'This Year' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'name', label: 'Name A-Z' },
  { value: 'date', label: 'Date Created' },
];

export default function EventsPage() {
  const { data, error, isLoading } = useSWR(endpoint.tourevents, fetcher);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState(eventTypes[0]);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState(timeFilters[0]);
  const [sortBy, setSortBy] = useState('newest');

  const events: TourEvent[] = useMemo(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Events API Response:', data);
    }
    
    if (!data?.data?.data) return [];
    return Array.isArray(data.data.data) ? data.data.data : [];
  }, [data]);

  const filteredEvents = useMemo(() => {
    let filtered = events.filter((event) => {
      // Search filter
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Type filter
      const matchesType = selectedType === 'All Events' || 
                         event.title.toLowerCase().includes(selectedType.toLowerCase()) ||
                         event.description.toLowerCase().includes(selectedType.toLowerCase());
      
      // Time filter - since API doesn&apos;t have event_date, use created_at or updated_at
      const eventDate = new Date(event.created_at || event.updated_at);
      const now = new Date();
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const thisYear = new Date(now.getFullYear(), 0, 1);

      let matchesTime = true;
      switch (selectedTimeFilter.value) {
        case 'upcoming':
          matchesTime = eventDate >= now;
          break;
        case 'this-month':
          matchesTime = eventDate >= thisMonth && eventDate < nextMonth;
          break;
        case 'next-month':
          matchesTime = eventDate >= nextMonth && eventDate < new Date(now.getFullYear(), now.getMonth() + 2, 1);
          break;
        case 'this-year':
          matchesTime = eventDate >= thisYear;
          break;
      }
      
      return matchesSearch && matchesType && matchesTime;
    });

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
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
  }, [events, searchTerm, selectedType, selectedTimeFilter, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType(eventTypes[0]);
    setSelectedTimeFilter(timeFilters[0]);
    setSortBy('newest');
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            We&apos;re having trouble loading the events. Please try again later.
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
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Papua Cultural Events
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Immerse yourself in Papua&apos;s rich cultural heritage through vibrant festivals, 
              traditional ceremonies, and unique local events that celebrate the spirit of this amazing land.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <i className="fas fa-calendar-alt"></i>
                <span>{events.length} Events</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-users"></i>
                <span>Cultural Experiences</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-music"></i>
                <span>Traditional Arts</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Event Types */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Explore Event Categories
            </h2>
            <p className="text-gray-600">
              Discover different types of cultural events and celebrations
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {eventTypes.slice(1).map((type, index) => (
              <motion.button
                key={type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedType(type)}
                className={`p-4 rounded-xl text-center transition-all duration-300 ${
                  selectedType === type
                    ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="text-2xl mb-2">
                  {type === 'Cultural Festival' && '🎭'}
                  {type === 'Music & Arts' && '🎵'}
                  {type === 'Food & Culinary' && '🍽️'}
                  {type === 'Sports & Adventure' && '🏃'}
                  {type === 'Religious Ceremony' && '🙏'}
                  {type === 'Traditional Dance' && '💃'}
                </div>
                <div className="text-sm font-medium">{type}</div>
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
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              {/* Time Filter */}
              <select
                value={selectedTimeFilter.value}
                onChange={(e) => {
                  const filter = timeFilters.find(f => f.value === e.target.value);
                  if (filter) setSelectedTimeFilter(filter);
                }}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {timeFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
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
            {selectedType !== 'All Events' && (
              <Badge variant="secondary">
                {selectedType}
                <button
                  onClick={() => setSelectedType(eventTypes[0])}
                  className="ml-2 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedTimeFilter.value !== 'all' && (
              <Badge variant="success">
                {selectedTimeFilter.label}
                <button
                  onClick={() => setSelectedTimeFilter(timeFilters[0])}
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
                {filteredEvents.length} Events Found
              </h2>
              <p className="text-gray-600 mt-1">
                Join us for unforgettable cultural experiences
              </p>
            </div>
          </div>

          {/* Events Grid */}
          <TourGrid
            tours={filteredEvents}
            type="event"
            loading={isLoading}
            columns={3}
          />

          {/* No Results */}
          {!isLoading && filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-calendar-alt text-3xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No events found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse all events
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
