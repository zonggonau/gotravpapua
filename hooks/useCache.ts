'use client';

import { useState, useEffect, useCallback } from 'react';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class CacheManager {
  private cache = new Map<string, CacheItem<any>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes default

  set<T>(key: string, data: T, ttl?: number): void {
    const now = Date.now();
    const expiresAt = now + (ttl || this.defaultTTL);
    
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    // Check if expired
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;
    
    // Check if expired
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  clear(key?: string): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  // Clean expired items
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}

// Global cache instance
const cacheManager = new CacheManager();

// Cleanup expired items every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    cacheManager.cleanup();
  }, 5 * 60 * 1000);
}

export interface UseCacheOptions {
  ttl?: number; // Time to live in milliseconds
  staleWhileRevalidate?: boolean; // Return stale data while fetching new data
}

export function useCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: UseCacheOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const { ttl = 5 * 60 * 1000, staleWhileRevalidate = true } = options;

  const fetchData = useCallback(async (useStale = false) => {
    try {
      if (!useStale) {
        setIsLoading(true);
      } else {
        setIsValidating(true);
      }
      setError(null);

      const result = await fetcher();
      
      // Cache the result
      cacheManager.set(key, result, ttl);
      setData(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      console.error(`Cache fetch error for key "${key}":`, error);
    } finally {
      setIsLoading(false);
      setIsValidating(false);
    }
  }, [key, fetcher, ttl]);

  const mutate = useCallback(async (newData?: T) => {
    if (newData !== undefined) {
      // Update cache with new data
      cacheManager.set(key, newData, ttl);
      setData(newData);
    } else {
      // Revalidate
      await fetchData();
    }
  }, [key, ttl, fetchData]);

  const clearCache = useCallback(() => {
    cacheManager.clear(key);
    setData(null);
  }, [key]);

  useEffect(() => {
    // Check if we have cached data
    const cachedData = cacheManager.get<T>(key);
    
    if (cachedData) {
      setData(cachedData);
      
      // If staleWhileRevalidate is enabled, fetch fresh data in background
      if (staleWhileRevalidate) {
        fetchData(true);
      }
    } else {
      // No cached data, fetch fresh
      fetchData();
    }
  }, [key, fetchData, staleWhileRevalidate]);

  return {
    data,
    isLoading,
    error,
    isValidating,
    mutate,
    clearCache,
    // Utility functions
    refresh: () => fetchData(),
    isStale: !cacheManager.has(key)
  };
}

// Export cache manager for direct access if needed
export { cacheManager };
