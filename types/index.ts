// API Response Types
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

// Paginated API Response
export interface PaginatedApiResponse<T> {
  status: boolean;
  message: string;
  data: {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

// Slider Types
export interface SliderItem {
  id: number;
  title: string;
  description: string;
  picture: string;
  button_text: string;
  button_link: string | null;
  created_at: string;
  updated_at: string;
}

// Tour Package Types
export interface TourPackage {
  id: number;
  title: string;
  slug: string;
  description: string;
  body: string;
  picture: string;
  status: string;
  locations_id: number | null;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    name: string;
    slug: string;
    job_title: string;
    description: string;
    picture: string;
  };
  // Optional fields that might be added later
  price?: number;
  duration?: string;
  location?: string;
  gallery?: string[];
  facilities?: string[];
  itinerary?: ItineraryItem[];
}

export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

// Tour Destination Types
export interface TourDestination {
  id: number;
  title: string;
  slug: string;
  description: string;
  body?: string;
  picture: string;
  status: string;
  locations_id: number | null;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    name: string;
    slug: string;
    job_title: string;
    description: string;
    picture: string;
  };
  // Optional fields that might be added later
  location?: string;
  gallery?: string[];
  attractions?: string[];
}

// Tour Adventure Types
export interface TourAdventure {
  id: number;
  title: string;
  slug: string;
  description: string;
  body?: string;
  difficulty_level: 'easy' | 'medium' | 'hard' | 'extreme';
  picture: string;
  status: string;
  locations_id: number | null;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    name: string;
    slug: string;
    job_title: string;
    description: string;
    picture: string;
  };
  // Optional fields that might be added later
  duration?: string;
  location?: string;
  gallery?: string[];
  equipment_needed?: string[];
}

// Tour Event Types
export interface TourEvent {
  id: number;
  title: string;
  slug: string;
  description: string;
  body: string;
  picture: string;
  status: string;
  locations_id: number | null;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    slug: string;
    job_title: string;
    description: string;
    picture: string;
  };
}

// Settings Types
export interface Settings {
  id: number;
  site_name: string;
  site_description: string;
  email_address: string;
  telephone: string | null;
  office_address: string;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  youtube: string | null;
  linkedin: string | null;
  logo: string;
  favicon: string;
  created_at: string;
  updated_at: string;
}

// Component Props Types
export interface CarouselProps {
  data: SliderItem[];
}

export interface TourCardProps {
  tour: TourPackage | TourDestination | TourAdventure | TourEvent;
  type: 'package' | 'destination' | 'adventure' | 'event';
}

export interface LoadingSkeletonProps {
  count?: number;
  height?: number;
  className?: string;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

// Search Types
export interface SearchFilters {
  category?: string;
  location?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  duration?: string;
  difficulty?: string;
}

export interface SearchResults<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Form Types
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface BookingForm {
  tourId: number;
  tourType: string;
  name: string;
  email: string;
  phone: string;
  participants: number;
  preferredDate: string;
  specialRequests?: string;
}
