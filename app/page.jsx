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

export const metadata = {
  title: "Welcome to GoTravPapua",
  openGraph: {
    title: "GoTravPapua | Tour & Travel",
    description:
      "Your Premier Travel Agent for Unforgettable Papua Adventures! Book Now for Authentic Experiences!",
    url: process.env.NEXT_PUBLIC_HOST,
    siteName: "GoTravPapua",
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
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js",
    description: "The React Framework for the Web",
    siteId: "1467726470533754880",
    creator: "@nextjs",
    creatorId: "1467726470533754880",
    images: [process.env.NEXT_PUBLIC_HOST + dataCarouselHero[0].imageUrl],
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
