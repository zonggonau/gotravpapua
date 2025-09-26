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

// Enhanced fetcher with error handling
export const fetcher = async (url: string): Promise<any> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (TOKEN) {
      headers.Authorization = `Bearer ${TOKEN}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

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
