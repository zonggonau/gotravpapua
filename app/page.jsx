import {
  About,
  AdventuresCarousel,
  TourPackages,
  BootstrapCarousel,
} from "@/components";

import { metadata } from "@/seo/Seoroot";
export { metadata };

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
