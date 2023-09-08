import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dataCarouselHero } from "@/data";
import { getDataAdventures } from "@/data/api";

export default async function Adventures() {
  const { data } = await getDataAdventures();
  return (
    <>
      <div className="main-content bg-white">
        <div className="rs-breadcrumbs breadcrumbs-overlay">
          <div className="breadcrumbs-img">
            <Image
              className="max-h-80"
              src={
                process.env.NEXT_PUBLIC_HOSTNAME + dataCarouselHero[4].imageUrl
              }
              alt="Breadcrumbs Image"
              height={1000}
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
                  <Link className="active" href="index.html">
                    Home
                  </Link>
                </li>
                <li>Adventures</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-success d-flex justify-content-center py-5">
          <div className="container">
            <form action="">
              <div className="row">
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-0 p-3 px-5 text-secondary"
                  />
                </div>
                <div className="col-md-2">
                  <button className="btn btn-lg btn-light link-success fw-bold rounded-0 p-3 px-5">
                    <i className="fa-solid fa-search"></i> Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="rs-gallery pt-100 pb-100 md-pt-70 md-pb-70">
          <div className="container">
            <div className="row">
              {data.map((item, index) => {
                return (
                  <div className="col-lg-4 mb-30 col-md-6" key={index}>
                    <div className="gallery-item">
                      <div className="gallery-Image">
                        <Link className="image-popup" href="#">
                          <Image
                            className="h-72"
                            src={
                              process.env.NEXT_PUBLIC_HOSTNAME + item.picture
                            }
                            alt=""
                            height={1000}
                            width={1000}
                          />
                        </Link>
                      </div>
                      <div className="title fs-2 fw-bold text-success">
                        Motorcycle Tours
                      </div>
                    </div>
                  </div>
                );
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
                    <span aria-hidden="true">&raquo;</span>
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
