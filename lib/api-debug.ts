import { endpoint } from '@/data/api';
import { debugLog } from './debug';

// API endpoint tester
export const testApiEndpoints = async () => {
  if (process.env.NODE_ENV !== 'development') return;

  debugLog.info('🔍 Testing API Endpoints...');
  
  const endpoints = [
    { name: 'Adventures List', url: endpoint.touradventures },
    { name: 'Packages List', url: endpoint.tourpackages },
    { name: 'Destinations List', url: endpoint.tourdestinations },
    { name: 'Events List', url: endpoint.tourevents },
    { name: 'Settings', url: endpoint.settings },
    { name: 'Slider', url: endpoint.slider },
  ];

  const results = [];

  for (const ep of endpoints) {
    try {
      debugLog.info(`Testing ${ep.name}: ${ep.url}`);
      const response = await fetch(ep.url);
      const data = await response.json();
      
      const result = {
        name: ep.name,
        url: ep.url,
        status: response.status,
        ok: response.ok,
        hasData: !!data?.data,
        dataType: Array.isArray(data?.data) ? 'array' : typeof data?.data,
        dataLength: Array.isArray(data?.data) ? data.data.length : 'N/A',
        structure: data ? Object.keys(data) : [],
      };
      
      results.push(result);
      
      if (response.ok) {
        debugLog.success(`✅ ${ep.name}`, result);
      } else {
        debugLog.error(`❌ ${ep.name}`, result);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const result = {
        name: ep.name,
        url: ep.url,
        error: errorMessage,
        status: 'Network Error'
      };
      results.push(result);
      debugLog.error(`❌ ${ep.name}`, error);
    }
  }

  console.table(results);
  return results;
};

// Test specific adventure endpoint
export const testAdventureEndpoint = async (slug: string) => {
  if (process.env.NODE_ENV !== 'development') return;

  const url = `${endpoint.touradventures}/${slug}`;
  debugLog.info(`🔍 Testing Adventure Detail: ${url}`);

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    const result = {
      slug,
      url,
      status: response.status,
      ok: response.ok,
      hasData: !!data?.data,
      adventure: data?.data ? {
        id: data.data.id,
        title: data.data.title,
        difficulty: data.data.difficulty_level,
        hasGallery: !!data.data.gallery,
        galleryLength: data.data.gallery?.length || 0,
      } : null,
      fullResponse: data,
    };

    if (response.ok && data?.data) {
      debugLog.success('✅ Adventure found', result);
    } else if (response.ok && !data?.data) {
      debugLog.warn('⚠️ Adventure not found (empty data)', result);
    } else {
      debugLog.error('❌ Adventure request failed', result);
    }

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    debugLog.error('❌ Adventure request error', error);
    return { slug, url, error: errorMessage };
  }
};

// Get available adventure slugs
export const getAvailableAdventures = async () => {
  if (process.env.NODE_ENV !== 'development') return [];

  try {
    const response = await fetch(endpoint.touradventures);
    const data = await response.json();
    
    if (data?.data && Array.isArray(data.data)) {
      const adventures = data.data.map((adventure: any) => ({
        id: adventure.id,
        title: adventure.title,
        slug: adventure.slug,
        difficulty: adventure.difficulty_level,
      }));
      
      debugLog.info('📋 Available Adventures', adventures);
      return adventures;
    }
    
    return [];
  } catch (error) {
    debugLog.error('❌ Failed to get adventures list', error);
    return [];
  }
};

// Debug helper for checking data structure
export const analyzeDataStructure = (data: any, expectedFields: string[] = []) => {
  if (process.env.NODE_ENV !== 'development') return;

  const analysis = {
    type: typeof data,
    isArray: Array.isArray(data),
    isNull: data === null,
    isUndefined: data === undefined,
    keys: data && typeof data === 'object' ? Object.keys(data) : [],
    hasExpectedFields: expectedFields.map(field => ({
      field,
      exists: data && typeof data === 'object' && field in data,
      value: data?.[field],
      type: typeof data?.[field],
    })),
    sampleData: data && typeof data === 'object' ? 
      (Array.isArray(data) ? data.slice(0, 2) : data) : data,
  };

  debugLog.info('🔍 Data Structure Analysis', analysis);
  return analysis;
};
