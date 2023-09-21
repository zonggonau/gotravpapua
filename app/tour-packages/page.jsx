import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dataCarouselHero } from "@/data";
import { getDataTourDestination, getDataTourPackages } from "@/data/api";
import { metadata } from "@/seo/Seotourpackages";
import { SearchPackages } from "@/components/Search";

export { metadata };
export default async function TourPackages() {
  const { data } = await getDataTourPackages();

  return (
    <>
      <div className="main-content bg-white">
        <div className="rs-breadcrumbs breadcrumbs-overlay">
          <div className="breadcrumbs-img">
            <Image
              className="h-96"
              src={process.env.NEXT_PUBLIC_HOST + dataCarouselHero[3].imageUrl}
              alt="Breadcrumbs Image"
              loading="lazy"
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
              Toure Packages
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
                <li>Toure Packages</li>
              </ul>
            </div>
          </div>
        </div>

        <SearchPackages data={data} />
      </div>
    </>
  );
}
