import type { 
  ApiResponse, 
  SliderItem, 
  TourPackage, 
  TourDestination, 
  TourAdventure, 
  TourEvent, 
  Settings 
} from '@/types';

const TOKEN = "";
const HOST = process.env.NEXT_PUBLIC_HOST_API || 'https://nokenpanel.gotravpapua.com/api/v1/';

export const endpoint = {
  slider: `${HOST}sliders`,
  tourpackages: `${HOST}tour-packages`,
  tourdestinations: `${HOST}tour-destinations`,
  touradventures: `${HOST}tour-adventures`,
  tourevents: `${HOST}tour-events`,
  settings: `${HOST}settings`,
};

// Enhanced fetcher with error handling and fallback data
export const fetcher = async (url: string): Promise<any> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (TOKEN) {
      headers.Authorization = `Bearer ${TOKEN}`;
    }

    const response = await fetch(url, { 
      headers,
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Normalize image URLs to use local assets
    const normalizedData = normalizeImageUrls(data);
    
    // Log successful API response in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ API Success for ${url}:`, normalizedData);
    }
    
    return normalizedData;
  } catch (error) {
    console.error('Fetch error for', url, ':', error);
    
    // Return fallback data based on the endpoint
    return getFallbackData(url);
  }
};

// Fallback data function
function getFallbackData(url: string): any {
  const { sampleTourPackages, sampleSliderItems, sampleSettings } = require('./sampleData');
  
  if (process.env.NODE_ENV === 'development') {
    console.warn(`🔄 Using fallback data for ${url}`);
  }
  
  if (url.includes('tour-packages')) {
    return {
      success: true,
      message: "Fallback data loaded",
      data: {
        data: sampleTourPackages
      }
    };
  }
  
  if (url.includes('sliders')) {
    return {
      success: true,
      message: "Fallback data loaded",
      data: {
        data: sampleSliderItems
      }
    };
  }
  
  if (url.includes('settings')) {
    return {
      success: true,
      message: "Fallback data loaded",
      data: sampleSettings
    };
  }
  
  // Default fallback for other endpoints
  return {
    success: false,
    message: "No data available",
    data: {
      data: []
    }
  };
}

// Helper function to normalize image URLs to use local assets
function normalizeImageUrls(data: any): any {
  if (!data) return data;
  
  if (Array.isArray(data)) {
    return data.map(item => normalizeImageUrls(item));
  }
  
  if (typeof data === 'object') {
    const normalized = { ...data };
    
    // Normalize picture field
    if (normalized.picture && typeof normalized.picture === 'string') {
      if (normalized.picture.includes('nokenpanel.gotravpapua.com') || 
          normalized.picture.includes('tours/') || 
          !normalized.picture.startsWith('/assets/')) {
        normalized.picture = '/assets/images/slider/1.png';
      }
    }
    
    // Normalize gallery field
    if (normalized.gallery && Array.isArray(normalized.gallery)) {
      normalized.gallery = normalized.gallery.map((img: string, index: number) => {
        if (img.includes('nokenpanel.gotravpapua.com') || 
            img.includes('tours/') || 
            !img.startsWith('/assets/')) {
          return `/assets/images/slider/${(index % 9) + 1}.png`;
        }
        return img;
      });
    }
    
    // Recursively normalize nested objects
    Object.keys(normalized).forEach(key => {
      if (typeof normalized[key] === 'object') {
        normalized[key] = normalizeImageUrls(normalized[key]);
      }
    });
    
    return normalized;
  }
  
  return data;
}

// Enhanced API functions with proper typing and error handling
export async function getDataTourDestination(): Promise<ApiResponse<TourDestination[]>> {
  try {
    const res = await fetch(`${HOST}tour-destinations`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch tour destinations: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching tour destinations:', error);
    throw error;
  }
}

export async function getDataTourPackages(): Promise<ApiResponse<TourPackage[]>> {
  try {
    const res = await fetch(`${HOST}tour-packages`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch tour packages: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching tour packages:', error);
    throw error;
  }
}

export async function getDataAdventures(): Promise<ApiResponse<TourAdventure[]>> {
  try {
    const res = await fetch(`${HOST}tour-adventures`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch adventures: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching adventures:', error);
    throw error;
  }
}

export async function getDataEvents(): Promise<ApiResponse<TourEvent[]>> {
  try {
    const res = await fetch(`${HOST}tour-events`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch events: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

export async function getDataSlider(): Promise<ApiResponse<SliderItem[]>> {
  try {
    const res = await fetch(`${HOST}sliders`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch sliders: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching sliders:', error);
    throw error;
  }
}

export async function getDataDetails(
  category: string, 
  slug: string
): Promise<ApiResponse<TourPackage | TourDestination | TourAdventure | TourEvent>> {
  try {
    const res = await fetch(`${HOST}${category}/${slug}/detail`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch ${category} details: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching ${category} details:`, error);
    throw error;
  }
}

export async function getSettings(): Promise<ApiResponse<Settings>> {
  try {
    const res = await fetch(`${HOST}settings`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch settings: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
}

export async function getAnotherTour(
  category: string
): Promise<ApiResponse<TourPackage[] | TourDestination[] | TourAdventure[] | TourEvent[]>> {
  try {
    const res = await fetch(`${HOST}${category}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch ${category}: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
    throw error;
  }
}

// Search function
export async function searchTours(
  query: string,
  category?: string,
  filters?: Record<string, any>
): Promise<ApiResponse<any[]>> {
  try {
    const searchParams: Record<string, string> = { q: query };
    
    if (category) {
      searchParams.category = category;
    }
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]: [string, any]) => {
        if (value !== undefined && value !== null) {
          searchParams[key] = String(value);
        }
      });
    }

    const params = new URLSearchParams(searchParams);

    const res = await fetch(`${HOST}search?${params}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Search failed: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error searching tours:', error);
    throw error;
  }
}
