// Modern components
import HeroCarousel from "./hero";
import { TourPackages } from "./tours/TourPackages/TourPackages";
import { Adventures } from "./tours/Adventures/Adventures";
import About from "./sections/About/About";

// Export modern components
export { 
  About, 
  HeroCarousel,
  TourPackages,
  Adventures,
  // Legacy aliases for backward compatibility
  Adventures as AdventuresCarousel
};
