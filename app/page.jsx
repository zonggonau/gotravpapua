import {
  About,
  AdventuresCarousel,
  TourPackages,
  BootstrapCarousel,
} from "@/components";
import { getDataAdventures, getDataTourPackages } from "@/data/api";

export const metadata = {
  title: "Welcome GoTravPapua",
  description:
    "Lorem cillum aute exercitation id ut deserunt magna dolore eiusmod id enim incididunt.",
};
export default async function Home() {
  const { data: Adventure } = await getDataAdventures();
  const { data: Package } = await getDataTourPackages();
  return (
    <>
      <div className="main-content bg-white">
        <div className="rs-slider main-home">
          <BootstrapCarousel />
          <About />
          <AdventuresCarousel data={Adventure} />
          <TourPackages data={Package} />
        </div>
      </div>
    </>
  );
}
