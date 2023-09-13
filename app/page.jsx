import {
  About,
  AdventuresCarousel,
  TourPackages,
  BootstrapCarousel,
} from "@/components";
import { dataCarouselHero } from "@/data";
import {
  getDataAdventures,
  getDataSlider,
  getDataTourPackages,
  getSettings,
} from "@/data/api";

// export const metadata = {
//   title: "Welcome to GoTravPapua",
//   description:
//     "GoTravPapua - Your Premier Travel Agent for Unforgettable Papua Adventures! Book Now for Authentic Experiences!",
//   keywords: [
//     "gotrav",
//     "papua travel",
//     "gotravpapua",
//     "papua",
//     "traveling",
//     "destination",
//   ],
// };

export const metadata = {
  title: "Welcome to GoTravPapua",
  openGraph: {
    title: "Next.js",
    description: "The React Framework for the Web",
    url: "https://nextjs.org",
    siteName: "Next.js",
    images: [
      {
        url: process.env.NEXT_PUBLIC_HOST + dataCarouselHero[0].imageUrl,
        width: 800,
        height: 600,
      },
      {
        url: process.env.NEXT_PUBLIC_HOST + dataCarouselHero[0].imageUrl,
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
export default async function Home() {
  const { data: Adventure } = await getDataAdventures();
  const { data: Package } = await getDataTourPackages();
  const { data: Slider } = await getDataSlider();
  // const { data: settings } = await getSettings();

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
