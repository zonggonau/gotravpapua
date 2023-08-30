import About from "@/components/about";
import AdventuresCarousel from "@/components/banner/AdventuresCarousel";
import BootstrapCarousel from "@/components/hero/HeroCarousel";
import TourPackages from "@/components/tourpackages/TourPackages";

export default async function Home() {
  return (
    <>
      <div className="main-content bg-white">
        <div className="rs-slider main-home">
          <BootstrapCarousel />
          <About />
          <AdventuresCarousel />
          <TourPackages />
        </div>
      </div>
    </>
  );
}
