import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dataCarouselHero } from "@/data";
import { getDataEvents } from "@/data/api";

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

        <div
          id="rs-blog"
          className="rs-blog orange-color style1 modify1 pt-85 pb-100 md-pt-70 md-pb-70"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-8 pr-60 md-pr-15 md-mb-30 mb-0">
                {data.map((item, index) => {
                  if (item.status === "Publish") {
                    return (
                      <div
                        className="mb-4"
                        style={{
                          borderBottomStyle: "dotted",
                          borderBottomColor: "#ccc",
                        }}
                        key={index}
                      >
                        <div className="row no-gutter white-bg blog-item border-0">
                          <div className="col-md-4">
                            <div className="image-part">
                              <Link href={`tour-events/${item.slug}`}>
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
                          <div className="col-md-8">
                            <div className="blog-content">
                              <ul className="blog-meta">
                                <li>
                                  <small className="border p-2 px-3">
                                    <i className="fa-solid fa-calendar-check-o"></i>{" "}
                                    8 Aug 2023 - 10 Aug 2023
                                  </small>
                                </li>
                              </ul>
                              <h3 className="title">
                                <Link href="blog-single.html">
                                  Baliem Valley Festival
                                </Link>
                              </h3>
                              <p className="m-0">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Est debitis similique cum esse
                                iusto, adipisci ab odit sunt totam sequi.
                              </p>
                              <ul className="blog-meta mt-3">
                                <li>
                                  <Link href="" className="btn p-0">
                                    <i className="fa-solid fa-tag"></i> Cultural
                                  </Link>
                                </li>
                                <li>
                                  <Link href="" className="btn p-0">
                                    <i className="fa-solid fa-map-marker"></i>{" "}
                                    Wamena
                                  </Link>
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

              <div className="col-lg-4 pr-60 md-pr-15 md-mb-30">
                <div className="bg-info p-4 text-light">
                  <h3 className="text-light">Lorem ipsum dolor sit amet.</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Quia, sed, ducimus culpa voluptatum, consectetur natus cum
                    tenetur dignissimos explicabo obcaecati iusto delectus saepe
                    sequi quod.
                  </p>
                  <button className="btn btn-lg btn-light link-info rounded-0 w-100 fw-bold">
                    <i className="fa-solid fa-paper-plane"></i> Join Now!
                  </button>
                </div>
                <div className="p-4" style={{ backgroundColor: "azure" }}>
                  <p className="p-0">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quasi aliquam magni quos, impedit quibusdam sequi
                    necessitatibus optio cum beatae ducimus molestiae, aperiam
                    voluptatum nemo qui!
                  </p>
                </div>
                <div className="border mt-3 p-4">
                  <p className="p-0">
                    Lorem, amet consectetur adipisicing elit. ipsum dolor sit
                    amet consectetur adipisicing elit.{" "}
                  </p>
                </div>
                <div className="border mt-3 p-4">
                  <p className="p-0">
                    Lorem, amet consectetur adipisicing elit. ipsum dolor sit
                    amet consectetur adipisicing elit.{" "}
                  </p>
                </div>
                <div className="border mt-3 p-4">
                  <p className="p-0">
                    Lorem, amet consectetur adipisicing elit. ipsum dolor sit
                    amet consectetur adipisicing elit.{" "}
                  </p>
                </div>
              </div>
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
