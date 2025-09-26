'use client';

import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { endpoint, fetcher } from '@/data/api';
import { TourGrid } from '@/components/tours/TourGrid/TourGrid';
import { Button, Badge } from '@/components/ui';
import { motion } from 'framer-motion';
import { TourAdventure } from '@/types';

const difficultyLevels = [
  { value: 'all', label: 'All Levels', color: 'bg-gray-100 text-gray-700', icon: '🎯' },
  { value: 'easy', label: 'Easy', color: 'bg-green-100 text-green-700', icon: '🟢' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700', icon: '🟡' },
  { value: 'hard', label: 'Hard', color: 'bg-orange-100 text-orange-700', icon: '🟠' },
  { value: 'extreme', label: 'Extreme', color: 'bg-red-100 text-red-700', icon: '🔴' },
];

const adventureTypes = [
  'All Types',
  'Hiking & Trekking',
  'Water Sports',
  'Wildlife Watching',
  'Cultural Immersion',
  'Photography',
  'Extreme Sports',
];

const durations = [
  'All Durations',
  'Half Day',
  '1 Day',
  '2-3 Days',
  '4-7 Days',
  '1+ Week',
];

export default function AdventuresPage() {
  const { data, error, isLoading } = useSWR(endpoint.touradventures, fetcher);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState(adventureTypes[0]);
  const [selectedDuration, setSelectedDuration] = useState(durations[0]);
  const [sortBy, setSortBy] = useState('name');

  const adventures: TourAdventure[] = useMemo(() => {
    if (!data?.data?.data) return [];
    return Array.isArray(data.data.data) ? data.data.data : [];
  }, [data]);

  const filteredAdventures = useMemo(() => {
    let filtered = adventures.filter((adventure) => {
      // Search filter
      const matchesSearch = adventure.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           adventure.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Difficulty filter
      const matchesDifficulty = selectedDifficulty === 'all' || 
                               adventure.difficulty_level === selectedDifficulty;
      
      // Type filter (based on title/description keywords)
      const matchesType = selectedType === 'All Types' || 
                         adventure.title.toLowerCase().includes(selectedType.toLowerCase()) ||
                         adventure.description.toLowerCase().includes(selectedType.toLowerCase());
      
      // Duration filter
      const matchesDuration = selectedDuration === 'All Durations' || 
                             (adventure.duration || 'N/A').includes(selectedDuration.split(' ')[0]);

      return matchesSearch && matchesDifficulty && matchesType && matchesDuration;
    });

    // Sort adventures
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'difficulty':
          const difficultyOrder = { easy: 1, medium: 2, hard: 3, extreme: 4 };
          return difficultyOrder[a.difficulty_level] - difficultyOrder[b.difficulty_level];
        case 'name':
          return a.title.localeCompare(b.title);
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [adventures, searchTerm, selectedDifficulty, selectedType, selectedDuration, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDifficulty('all');
    setSelectedType(adventureTypes[0]);
    setSelectedDuration(durations[0]);
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
            We&apos;re having trouble loading the adventures. Please try again later.
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
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Papua Adventures Await
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Challenge yourself with thrilling adventures in Papua&apos;s pristine wilderness. 
              From gentle nature walks to extreme expeditions, find your perfect adventure level.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <i className="fas fa-mountain"></i>
                <span>{adventures.length} Adventures</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-users"></i>
                <span>Expert Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-medal"></i>
                <span>All Skill Levels</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Difficulty Levels */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Choose Your Adventure Level
            </h2>
            <p className="text-gray-600">
              Select the difficulty level that matches your experience and fitness
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {difficultyLevels.map((level, index) => (
              <motion.button
                key={level.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedDifficulty(level.value)}
                className={`p-6 rounded-xl text-center transition-all duration-300 border-2 ${
                  selectedDifficulty === level.value
                    ? `${level.color} border-current`
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-transparent'
                }`}
              >
                <div className="text-3xl mb-2">{level.icon}</div>
                <div className="font-semibold">{level.label}</div>
                <div className="text-xs mt-1 opacity-75">
                  {level.value === 'easy' && 'Perfect for beginners'}
                  {level.value === 'medium' && 'Some experience needed'}
                  {level.value === 'hard' && 'For experienced adventurers'}
                  {level.value === 'extreme' && 'Expert level only'}
                  {level.value === 'all' && 'View all adventures'}
                </div>
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
                  placeholder="Search adventures..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              {/* Adventure Type */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {adventureTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
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

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="name">Sort by Name</option>
                <option value="difficulty">Sort by Difficulty</option>
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
            {selectedDifficulty !== 'all' && (
              <Badge variant="secondary">
                {difficultyLevels.find(d => d.value === selectedDifficulty)?.label}
                <button
                  onClick={() => setSelectedDifficulty('all')}
                  className="ml-2 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedType !== 'All Types' && (
              <Badge variant="success">
                {selectedType}
                <button
                  onClick={() => setSelectedType(adventureTypes[0])}
                  className="ml-2 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedDuration !== 'All Durations' && (
              <Badge variant="warning">
                {selectedDuration}
                <button
                  onClick={() => setSelectedDuration(durations[0])}
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
                {filteredAdventures.length} Adventures Found
              </h2>
              <p className="text-gray-600 mt-1">
                Ready for your next adventure?
              </p>
            </div>
          </div>

          {/* Adventures Grid */}
          <TourGrid
            tours={filteredAdventures}
            type="adventure"
            loading={isLoading}
            columns={3}
          />

          {/* No Results */}
          {!isLoading && filteredAdventures.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-mountain text-3xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No adventures found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse all adventures
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
