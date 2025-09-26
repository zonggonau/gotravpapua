import { TourPackage, TourDestination, TourAdventure, TourEvent, SliderItem, Settings } from '@/types';

export const sampleTourPackages: TourPackage[] = [
  {
    id: 1,
    title: "Raja Ampat Marine Paradise",
    slug: "raja-ampat-marine-paradise",
    description: "Discover the underwater wonders of Raja Ampat, known as the crown jewel of marine biodiversity.",
    body: "Experience the most biodiverse marine environment on Earth with world-class diving and snorkeling opportunities. Raja Ampat offers pristine coral reefs, manta rays, and countless species of tropical fish.",
    picture: "/assets/images/slider/1.png",
    status: "active",
    locations_id: 1,
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
    // Optional fields
    gallery: [
      "/assets/images/slider/1.png",
      "/assets/images/slider/2.png",
      "/assets/images/slider/3.png"
    ],
    price: 8500000,
    duration: "5 Days 4 Nights",
    location: "Raja Ampat",
    facilities: [
      "Accommodation in eco-resort",
      "All meals",
      "Diving equipment",
      "Professional dive guide",
      "Boat transfers"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and Check-in",
        description: "Arrive at Sorong airport, transfer to resort, orientation session",
        activities: ["Airport pickup", "Resort check-in", "Orientation session", "Welcome dinner"]
      },
      {
        day: 2,
        title: "First Dive Experience",
        description: "Morning and afternoon dives at Cape Kri and Sardine Reef",
        activities: ["Morning dive at Cape Kri", "Lunch break", "Afternoon dive at Sardine Reef", "Equipment maintenance"]
      }
    ]
  },
  {
    id: 2,
    title: "Baliem Valley Cultural Trek",
    slug: "baliem-valley-cultural-trek",
    description: "Immerse yourself in the ancient culture of the Dani tribe in the stunning Baliem Valley.",
    body: "Journey through the highlands of Papua to meet the indigenous Dani people and experience their traditional way of life. Trek through beautiful landscapes and learn about ancient customs.",
    picture: "/assets/images/slider/4.png",
    status: "active",
    locations_id: 2,
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z",
    // Optional fields
    gallery: [
      "/assets/images/slider/4.png",
      "/assets/images/slider/5.png"
    ],
    price: 6200000,
    duration: "4 Days 3 Nights",
    location: "Wamena",
    facilities: [
      "Local guide",
      "Accommodation",
      "All meals",
      "Cultural activities",
      "Trekking permits"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Wamena",
        description: "Airport pickup, city tour, meet local guide",
        activities: ["Airport pickup", "City tour", "Meet local guide", "Traditional welcome ceremony"]
      },
      {
        day: 2,
        title: "Village Trek",
        description: "Trek to traditional Dani villages, cultural interactions",
        activities: ["Morning trek", "Village visit", "Cultural demonstrations", "Traditional lunch"]
      }
    ]
  },
  {
    id: 3,
    title: "Jayapura City & Lake Sentani Tour",
    slug: "jayapura-lake-sentani-tour",
    description: "Explore Papua's capital city and the beautiful Lake Sentani with its unique floating villages.",
    body: "Discover the cultural and natural attractions of Jayapura and Lake Sentani. Visit museums, traditional markets, and experience the serene beauty of Papua's largest lake.",
    picture: "/assets/images/slider/6.png",
    status: "active",
    locations_id: 3,
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-05T00:00:00Z",
    // Optional fields
    gallery: [
      "/assets/images/slider/6.png",
      "/assets/images/slider/7.png"
    ],
    price: 3500000,
    duration: "3 Days 2 Nights",
    location: "Jayapura",
    facilities: [
      "Hotel accommodation",
      "City tour guide",
      "Boat trip on Lake Sentani",
      "Museum entrance fees",
      "Local transportation"
    ],
    itinerary: [
      {
        day: 1,
        title: "Jayapura City Tour",
        description: "Visit Anthropology Museum, Base G Beach, local markets",
        activities: ["Museum visit", "Beach exploration", "Market tour", "Local lunch"]
      },
      {
        day: 2,
        title: "Lake Sentani Exploration",
        description: "Boat tour, visit floating villages, traditional crafts",
        activities: ["Boat departure", "Village visits", "Craft workshops", "Sunset viewing"]
      }
    ]
  }
];

export const sampleSliderItems: SliderItem[] = [
  {
    id: 1,
    title: "Embrace the wonder of birdwatching",
    description: "Discover Papua's incredible avian diversity in pristine rainforest environments.",
    picture: "/assets/images/slider/5.png",
    button_text: "Explore Tours",
    button_link: "/tour-packages",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    title: "Experience the enchanting underwater world through snorkeling",
    description: "Explore the world's most biodiverse marine environment in Raja Ampat.",
    picture: "/assets/images/slider/1.png",
    button_text: "Book Now",
    button_link: "/tour-packages",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  }
];

export const sampleSettings: Settings = {
  id: 1,
  site_name: "GoTrav Papua",
  site_description: "Discover the wonders of Papua with our expertly curated tours and adventures.",
  email_address: "info@gotravpapua.com",
  telephone: "+62 967 123456",
  office_address: "Jl. Raya Papua No. 123, Jayapura, Papua",
  facebook: "https://facebook.com/gotravpapua",
  instagram: "https://instagram.com/gotravpapua",
  twitter: "https://twitter.com/gotravpapua",
  youtube: "https://youtube.com/gotravpapua",
  linkedin: "https://linkedin.com/company/gotravpapua",
  logo: "/assets/images/logo.png",
  favicon: "/assets/images/fav-gotrav.png",
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z"
};
