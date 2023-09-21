import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dataCarouselHero } from "@/data";
import Kontak from "@/components/kontak";
import { metadata } from "@/seo/Seocontacts";
export { metadata };
import { getSettings } from "@/data/api";
export default async function Contact({}) {
  const { data } = await getSettings();

  function HTMLRenderer({ htmlString }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  }
  return (
    <>
      <div className="main-content bg-white">
        <div className="rs-breadcrumbs breadcrumbs-overlay">
          <div className="breadcrumbs-img">
            <Image
              className="h-96"
              src={process.env.NEXT_PUBLIC_HOST + dataCarouselHero[0].imageUrl}
              alt="Breadcrumbs Image"
              height={700}
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
              Contact
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
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="contact-page-section orange-color pt-100 pb-100 md-pt-70 md-pb-70">
          <div className="container">
            <div className="row pb-50">
              <div className="col-12">
                <div className="contact-map">
                  <HTMLRenderer htmlString={data.google_map_embed} />
                  {/* <iframe
                    src={`${data.google_map_embed}`}
                    width="100%"
                    height="500"
                    style={{ border: 0 }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe> */}
                </div>
              </div>
            </div>

            <Kontak data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
