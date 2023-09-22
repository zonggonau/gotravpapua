import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function TourPackages({ data }) {
  const limit = 6;
  const limitData = data.slice(0, limit);
  return (
    <>
      <div
        id="tour-packages"
        className="rs-popular-courses main-home event-bg pt-100 pb-100 md-pt-70 md-pb-70"
      >
        <div className="container py-5">
          <div className="sec-title3 text-center mb-45">
            <h2 className="black-color text-uppercase display-4 fw-bold">
              Tour Packages
            </h2>
            <div className="desc text-center col-md-8 mx-auto">
              Discover the untouched beauty of Papua with our Papuan Paradise
              Expedition, Coastal Retreat, Wildlife Safari, Cultural Immersion,
              Diving Expedition, Highlands Adventure, River Expedition, and many
              more.
            </div>
          </div>
          <div className="row">
            {limitData.map((item, index) => {
              return (
                <div className="col-lg-4 col-md-6 mb-24" key={index}>
                  <div className="courses-item">
                    <div className="courses-grid">
                      <div className="img-part">
                        <Link href={`tour-packages/${item.slug}`}>
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_HOSTNAME + item.picture
                            }
                            alt=""
                            width={500}
                            height={100}
                          />
                        </Link>
                      </div>
                      <div className="content-part">
                        <h3 className="title">
                          <Link href={`tour-packages/${item.slug}`}>
                            {item.title}
                          </Link>
                        </h3>
                        <ul className="meta-part">
                          <li>
                            <i className="fa fa-calendar-check-o"></i> 5 Days
                          </li>
                          <li>
                            <i className="fa fa-map-marker"></i> Nabire
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cta-content text-center">
            <div className="row">
              <div className="col-md-8 mx-auto">
                <p>
                  Discover a land of awe-inspiring mountains, dense rainforests,
                  and vibrant wildlife, while forging connections with the
                  warm-hearted locals and gaining a deeper understanding of
                  humanitys rich tapestry.
                </p>
                <Link
                  className="readon2 orange-transparent mr-20 rounded-0"
                  href="tour-packages"
                >
                  More Tour Packages
                  <i className="fa-solid fa-arrow-right ms-3"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
