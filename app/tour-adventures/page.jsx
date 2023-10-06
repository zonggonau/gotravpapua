import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dataCarouselHero } from "@/data";
import { getDataAdventures } from "@/data/api";
import { SearchAdventures } from "@/components/Search";
import { metadata } from "@/seo/Seotouradventures";
export { metadata };
export default async function Adventures() {
  const { data } = await getDataAdventures();

  return (
    <>
      <div className="main-content bg-white">
        <div className="rs-breadcrumbs breadcrumbs-overlay">
          <div className="breadcrumbs-img">
            <Image
              className="max-h-80"
              src={process.env.NEXT_PUBLIC_HOST + dataCarouselHero[4].imageUrl}
              alt="Breadcrumbs Image"
              height={1000}
              loading="lazy"
              width={1000}
            />
          </div>
          <div className="breadcrumbs-text white-color">
            <h1
              className="page-title white-color wow fadeInUp"
              data-wow-delay="300ms"
              data-wow-duration="2000ms"
            >
              Adventures
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
                  <Link className="active" href="/">
                    Home
                  </Link>
                </li>
                <li>Adventures</li>
              </ul>
            </div>
          </div>
        </div>
        <SearchAdventures data={data.data} />
      </div>
    </>
  );
}
