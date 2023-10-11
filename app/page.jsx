import {
  About,
  AdventuresCarousel,
  TourPackages,
  BootstrapCarousel,
} from "@/components";
import {
  getDataAdventures,
  getDataSlider,
  getDataTourPackages,
} from "@/data/api";

import { metadata } from "@/seo/Seoroot";
export { metadata };

export default async function Home() {
  const { data: slider } = await getDataSlider();
  const { data: adventure } = await getDataAdventures();
  const { data: packages } = await getDataTourPackages();

  return (
    <>
      <div className="main-content bg-white">
        <div className="rs-slider main-home">
          <BootstrapCarousel data={slider.data} />
          <About />
          <AdventuresCarousel data={adventure.data} />
          <TourPackages data={packages.data} />
        </div>
      </div>
    </>
  );
}
