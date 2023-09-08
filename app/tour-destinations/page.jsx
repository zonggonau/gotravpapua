import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dataCarouselHero } from "@/data";
import { getDataTourDestination } from "@/data/api";

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
                  <Link className="active" href="index.html">
                    Home
                  </Link>
                </li>
                <li>Destinations</li>
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
                    placeholder="Search . . ."
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

        <div
          id="rs-blog"
          className="rs-blog orange-color style1 modify1 pt-85 pb-100 md-pt-70 md-pb-70"
        >
          <div className="container">
            <div className="row">
              {data.map((item, index) => {
                if (item.status === "Publish") {
                  return (
                    <div className="col-lg-6 pr-60 md-pr-15 md-mb-30" key={index}>
                      <div className="row no-gutter white-bg blog-item mb-35">
                        <div className="col-md-6">
                          <div className="image-part h-100">
                            <Link href={`tour-destinations/${item.slug}`}>
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
                        </div>
                        <div className="col-md-6">
                          <div className="blog-content">
                            <h3 className="title">
                              <Link href="blog-single.html">{item.title}</Link>
                            </h3>
                            <ul className="blog-meta">
                              <li>
                                <i className="fa-solid fa-map-marker"></i> Nabire
                              </li>
                            </ul>
                            <p>{item.description}</p>
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
