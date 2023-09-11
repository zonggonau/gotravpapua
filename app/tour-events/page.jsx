import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dataCarouselHero } from "@/data";
import { getDataEvents } from "@/data/api";
import { SearchEvents } from "@/components/Search";

export const metadata = {
  title: "GoTravPapua Tour Events",
  description:
    "Join Our Exciting Tour Events for Unforgettable Travel Experiences. Discover, Explore, and Make Memories!",
};

export default async function Events() {
  const { data } = await getDataEvents();
  return (
    <>
      <div className="main-content bg-white">
        <div className="rs-breadcrumbs breadcrumbs-overlay">
          <div className="breadcrumbs-img">
            <Image
              className="h-96"
              src={process.env.NEXT_PUBLIC_HOST + dataCarouselHero[2].imageUrl}
              alt="Breadcrumbs Image"
              height={700}
              width={1000}
            />
          </div>
          <div className="breadcrumbs-text white-color">
            <h1
              className="page-title white-color wow fadeInUp"
              data-wow-delay="300ms"
              data-wow-duration="2000ms"
            >
              Events
            </h1>
            <div
              className="sec-title mb-40 md-mb-20 wow fadeInUp"
              data-wow-delay="300ms"
              data-wow-duration="2000ms"
            >
              <div className="desc text-center col-md-6 mx-auto">
                Discover the untouched beauty of Papua with our Papuan Paradise
                Expedition, Coastal Retreat, Wildlife Safari, Cultural
                Immersion, Diving Expedition, Highlands Adventure, River
                Expedition, and many more
              </div>
              <ul className="my-3 white-color">
                <li>
                  <Link className="active" href="index.html">
                    Home
                  </Link>
                </li>
                <li>Events</li>
              </ul>
            </div>
          </div>
        </div>

        <SearchEvents data={data} />
      </div>
    </>
  );
}
