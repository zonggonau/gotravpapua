'use client';

import { useCache } from './useCache';
import { endpoint, fetcher } from '@/data/api';

export interface HeaderData {
  settings: any;
  sliders: any[];
  tours: any[];
  destinations: any[];
  adventures: any[];
  events: any[];
}

// Cache settings for different data types
const CACHE_SETTINGS = {
  settings: { ttl: 30 * 60 * 1000 }, // 30 minutes - settings change rarely
  sliders: { ttl: 15 * 60 * 1000 }, // 15 minutes - sliders change occasionally
  tours: { ttl: 10 * 60 * 1000 }, // 10 minutes - tours change more frequently
  destinations: { ttl: 10 * 60 * 1000 }, // 10 minutes
  adventures: { ttl: 10 * 60 * 1000 }, // 10 minutes
  events: { ttl: 5 * 60 * 1000 }, // 5 minutes - events change most frequently
};

// Individual hooks for each data type
export function useSettings() {
  return useCache(
    'header-settings',
    () => fetcher(endpoint.settings),
    CACHE_SETTINGS.settings
  );
}

export function useSliders() {
  return useCache(
    'header-sliders',
    () => fetcher(endpoint.slider),
    CACHE_SETTINGS.sliders
  );
}

export function useTours() {
  return useCache(
    'header-tours',
    () => fetcher(endpoint.tourpackages),
    CACHE_SETTINGS.tours
  );
}

export function useDestinations() {
  return useCache(
    'header-destinations',
    () => fetcher(endpoint.tourdestinations),
    CACHE_SETTINGS.destinations
  );
}

export function useAdventures() {
  return useCache(
    'header-adventures',
    () => fetcher(endpoint.touradventures),
    CACHE_SETTINGS.adventures
  );
}

export function useEvents() {
  return useCache(
    'header-events',
    () => fetcher(endpoint.tourevents),
    CACHE_SETTINGS.events
  );
}

// Combined hook for all header data
export function useHeaderData() {
  const settings = useSettings();
  const sliders = useSliders();
  const tours = useTours();
  const destinations = useDestinations();
  const adventures = useAdventures();
  const events = useEvents();

  const isLoading = 
    settings.isLoading || 
    sliders.isLoading || 
    tours.isLoading || 
    destinations.isLoading || 
    adventures.isLoading || 
    events.isLoading;

  const isValidating = 
    settings.isValidating || 
    sliders.isValidating || 
    tours.isValidating || 
    destinations.isValidating || 
    adventures.isValidating || 
    events.isValidating;

  const hasError = 
    settings.error || 
    sliders.error || 
    tours.error || 
    destinations.error || 
    adventures.error || 
    events.error;

  const data: HeaderData = {
    settings: settings.data,
    sliders: sliders.data?.data?.data || [],
    tours: tours.data?.data?.data || [],
    destinations: destinations.data?.data?.data || [],
    adventures: adventures.data?.data?.data || [],
    events: events.data?.data?.data || [],
  };

  const refreshAll = async () => {
    await Promise.all([
      settings.refresh(),
      sliders.refresh(),
      tours.refresh(),
      destinations.refresh(),
      adventures.refresh(),
      events.refresh(),
    ]);
  };

  const clearAllCache = () => {
    settings.clearCache();
    sliders.clearCache();
    tours.clearCache();
    destinations.clearCache();
    adventures.clearCache();
    events.clearCache();
  };

  return {
    data,
    isLoading,
    isValidating,
    error: hasError,
    refreshAll,
    clearAllCache,
    // Individual data access
    settings: settings.data,
    sliders: sliders.data?.data?.data || [],
    tours: tours.data?.data?.data || [],
    destinations: destinations.data?.data?.data || [],
    adventures: adventures.data?.data?.data || [],
    events: events.data?.data?.data || [],
  };
}

// Hook for navigation data (lighter version for header/footer)
export function useNavigationData() {
  const settings = useSettings();
  
  // Provide safe fallback for settings data
  const safeSettings = settings.data || {
    data: {
      email_address: '',
      telephone: null,
      office_address: '',
      facebook: null,
      twitter: null,
      linkedin: null,
      youtube: null,
      instagram: null,
    }
  };
  
  return {
    settings: safeSettings,
    isLoading: settings.isLoading,
    error: settings.error,
    refresh: settings.refresh,
  };
}
