import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dataCarouselHero } from "@/data";
import { getDataTourDestination } from "@/data/api";
import { SearchDestination } from "@/components/Search";
import { metadata } from "@/seo/Seotourdestination";
export { metadata };

export default async function Destinations() {
  const { data } = await getDataTourDestination();
  return (
    <>
      <div className="main-content bg-white">
        <div className="rs-breadcrumbs breadcrumbs-overlay">
          <div className="breadcrumbs-img">
            <Image
              classNameName="h-96"
              src={
                process.env.NEXT_PUBLIC_HOST + `assets/images/breadcrumbs/9.png`
              }
              alt="Breadcrumbs Image"
              height={700}
              width={1000}
              loading="lazy"
            />
          </div>
          <div className="breadcrumbs-text white-color">
            <h1
              className="page-title white-color wow fadeInUp"
              data-wow-delay="300ms"
              data-wow-duration="2000ms"
            >
              Destinations
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
                <li>Destinations</li>
              </ul>
            </div>
          </div>
        </div>

        <SearchDestination data={data.data} />
      </div>
    </>
  );
}
