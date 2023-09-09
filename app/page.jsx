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

export const metadata = {
  title: "Welcome to GoTravPapua",
  description:
    "GoTravPapua - Your Premier Travel Agent for Unforgettable Papua Adventures! Book Now for Authentic Experiences!",
};
export default async function Home() {
  const { data: Adventure } = await getDataAdventures();
  const { data: Package } = await getDataTourPackages();
  const { data: Slider } = await getDataSlider();
  return (
    <>
      <div className="main-content bg-white">
        <div className="rs-slider main-home">
          <BootstrapCarousel data={Slider} />
          <About />
          <AdventuresCarousel data={Adventure} />
          <TourPackages data={Package} />
        </div>
      </div>
    </>
  );
}
