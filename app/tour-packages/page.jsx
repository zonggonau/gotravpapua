import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dataCarouselHero } from "@/data";
import { getDataTourPackages } from "@/data/api";

export const metadata = {
  title: "GoTravPapua Tour Packages",
  description:
    "Explore Our Exclusive Tour Packages for SEO-Optimized Travel Adventures. Book Your Dream Vacation Today!",
};
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
                  <Link className="active" href="index.html">
                    Home
                  </Link>
                </li>
                <li>Toure Packages</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-success d-flex justify-content-center py-5">
          <div className="row">
            <div className="col-md-4">
              <div className="destinations">
                <button
                  className="btn btn-outline-light btn-lg dropdown-toggle rounded-0"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Destinations
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" href="#">
                      Raja Ampat
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      Nabire
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      Jayapura
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-4">
              <div className="duration">
                <button
                  className="btn btn-outline-light btn-lg dropdown-toggle rounded-0"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Duration
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" href="#">
                      1 - 2 Days
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      3 - 5 Days
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      1 Week
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      Custom
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-4">
              <button className="btn btn-light btn-lg rounded-0 filter-btn">
                <i className="fa-solid fa-search"></i>
                Filter Packages
              </button>
            </div>
          </div>
        </div>

        <div
          id="tour-packages"
          className="rs-popular-courses main-home event-bg pt-100 pb-100 md-pt-70 md-pb-70"
        >
          <div className="container py-5">
            <div className="row">
              {data.map((item, index) => {
                if (item.status === "Publish") {
                  return (
                    <div className="col-lg-4 col-md-6 mb-24" key={index}>
                      <div className="courses-item">
                        <div className="courses-grid">
                          <div className="img-part">
                            <Link href={`tour-packages/${item.slug}`}>
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_HOSTNAME +
                                  item.picture
                                }
                                className="w-100"
                                alt=""
                                width={500}
                                height={500}
                              />
                            </Link>
                          </div>
                          <div className="content-part">
                            <h3 className="title">
                              <Link href="#">Papuan Paradise Expedition</Link>
                            </h3>
                            <ul className="flex justify-between">
                              <li>
                                <i className="fa fa-calendar-check-o"></i> 5
                                Days
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
                }
              })}
            </div>
          </div>
          <div className="container d-flex justify-content-center">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <Link className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" href="#">
                    1
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" href="#">
                    2
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" href="#">
                    3
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true"></span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
