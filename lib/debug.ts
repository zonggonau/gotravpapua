// Debug utilities for development
export const debugLog = {
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`ℹ️ ${message}`, data || '');
    }
  },
  
  success: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ ${message}`, data || '');
    }
  },
  
  error: (message: string, error?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(`❌ ${message}`, error || '');
    }
  },
  
  warn: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`⚠️ ${message}`, data || '');
    }
  },
  
  api: (endpoint: string, status: 'loading' | 'success' | 'error', data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      const emoji = status === 'loading' ? '🔄' : status === 'success' ? '✅' : '❌';
      console.log(`${emoji} API ${status.toUpperCase()}: ${endpoint}`, data || '');
    }
  },
  
  route: (page: string, params?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔍 Route Debug - ${page}:`, params || '');
    }
  }
};

export interface DebugInfo {
  slug?: string;
  endpoint?: string;
  isLoading?: boolean;
  error?: any;
  data?: any;
  timestamp?: string;
}

export const createDebugInfo = (info: Partial<DebugInfo>): DebugInfo => ({
  ...info,
  timestamp: new Date().toISOString(),
});

// Debug panel component props
export interface DebugPanelProps {
  title: string;
  debugInfo: DebugInfo;
  additionalInfo?: Record<string, any>;
}

// API response structure checker
export const checkApiResponse = (data: any, expectedStructure: string[] = ['data']) => {
  const result = {
    isValid: true,
    missing: [] as string[],
    structure: {} as Record<string, boolean>,
  };

  expectedStructure.forEach(key => {
    const hasKey = data && typeof data === 'object' && key in data;
    result.structure[key] = hasKey;
    if (!hasKey) {
      result.isValid = false;
      result.missing.push(key);
    }
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 API Response Structure Check:', {
      data,
      expected: expectedStructure,
      result
    });
  }

  return result;
};

// Slug validation
export const validateSlug = (slug: string | string[] | undefined): string | null => {
  if (!slug) {
    debugLog.warn('Slug validation failed: No slug provided');
    return null;
  }

  if (Array.isArray(slug)) {
    debugLog.warn('Slug validation failed: Slug is array', slug);
    return null;
  }

  if (typeof slug !== 'string') {
    debugLog.warn('Slug validation failed: Slug is not string', typeof slug);
    return null;
  }

  if (slug.trim().length === 0) {
    debugLog.warn('Slug validation failed: Empty slug');
    return null;
  }

  debugLog.success('Slug validation passed', slug);
  return slug;
};

// Network request debugger
export const debugFetcher = async (url: string) => {
  debugLog.api(url, 'loading');
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const error = {
        status: response.status,
        statusText: response.statusText,
        url: url,
        message: `HTTP ${response.status}: ${response.statusText}`
      };
      debugLog.api(url, 'error', error);
      throw error;
    }
    
    const data = await response.json();
    debugLog.api(url, 'success', { 
      status: response.status,
      dataKeys: Object.keys(data || {}),
      hasData: !!data?.data,
      dataLength: Array.isArray(data?.data) ? data.data.length : 'Not array'
    });
    
    return data;
  } catch (error) {
    debugLog.api(url, 'error', error);
    throw error;
  }
};
