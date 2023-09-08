import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dataCarouselHero } from "@/data";
import { getDataEvents } from "@/data/api";

export default async function Events() {
  const { data } = await getDataEvents();
  return (
    <>
      <div class="main-content bg-white">
        <div class="rs-breadcrumbs breadcrumbs-overlay">
          <div class="breadcrumbs-img">
            <Image
              className="h-96"
              src={
                process.env.NEXT_PUBLIC_HOSTNAME + dataCarouselHero[1].imageUrl
              }
              alt="Breadcrumbs Image"
              height={700}
              width={1000}
            />
          </div>
          <div class="breadcrumbs-text white-color">
            <h1
              class="page-title white-color wow fadeInUp"
              data-wow-delay="300ms"
              data-wow-duration="2000ms"
            >
              Events
            </h1>
            <div
              class="sec-title mb-40 md-mb-20 wow fadeInUp"
              data-wow-delay="300ms"
              data-wow-duration="2000ms"
            >
              <div class="desc text-center col-md-6 mx-auto">
                Discover the untouched beauty of Papua with our Papuan Paradise
                Expedition, Coastal Retreat, Wildlife Safari, Cultural
                Immersion, Diving Expedition, Highlands Adventure, River
                Expedition, and many more
              </div>
              <ul class="my-3 white-color">
                <li>
                  <Link class="active" href="index.html">
                    Home
                  </Link>
                </li>
                <li>Events</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-success d-flex justify-content-center py-5">
          <div class="container">
            <form action="">
              <div class="row">
                <div class="col-md-10">
                  <input
                    type="text"
                    class="form-control form-control-lg rounded-0 p-3 px-5 text-secondary"
                  />
                </div>
                <div class="col-md-2">
                  <button class="btn btn-lg btn-light link-success fw-bold rounded-0 p-3 px-5">
                    <i class="fa-solid fa-search"></i> Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div
          id="rs-blog"
          class="rs-blog orange-color style1 modify1 pt-85 pb-100 md-pt-70 md-pb-70"
        >
          <div class="container">
            <div class="row">
              <div class="col-lg-8 pr-60 md-pr-15 md-mb-30 mb-0">
                {data.map((item, index) => {
                  return (
                    <div
                      class="mb-4"
                      style={{
                        borderBottomStyle: "dotted",
                        borderBottomColor: "#ccc",
                      }}
                      key={index}
                    >
                      <div class="row no-gutter white-bg blog-item border-0">
                        <div class="col-md-4">
                          <div class="image-part">
                            <Link href="#">
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_HOSTNAME +
                                  item.picture
                                }
                                class="w-100"
                                alt=""
                                width={500}
                                height={500}
                              />
                            </Link>
                          </div>
                        </div>
                        <div class="col-md-8">
                          <div class="blog-content">
                            <ul class="blog-meta">
                              <li>
                                <small class="border p-2 px-3">
                                  <i class="fa-solid fa-calendar-check-o"></i> 8
                                  Aug 2023 - 10 Aug 2023
                                </small>
                              </li>
                            </ul>
                            <h3 class="title">
                              <Link href="blog-single.html">
                                Baliem Valley Festival
                              </Link>
                            </h3>
                            <p class="m-0">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Est debitis similique cum esse iusto,
                              adipisci ab odit sunt totam sequi.
                            </p>
                            <ul class="blog-meta mt-3">
                              <li>
                                <Link href="" class="btn p-0">
                                  <i class="fa-solid fa-tag"></i> Cultural
                                </Link>
                              </li>
                              <li>
                                <Link href="" class="btn p-0">
                                  <i class="fa-solid fa-map-marker"></i> Wamena
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div class="col-lg-4 pr-60 md-pr-15 md-mb-30">
                <div class="bg-info p-4 text-light">
                  <h3 class="text-light">Lorem ipsum dolor sit amet.</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Quia, sed, ducimus culpa voluptatum, consectetur natus cum
                    tenetur dignissimos explicabo obcaecati iusto delectus saepe
                    sequi quod.
                  </p>
                  <button class="btn btn-lg btn-light link-info rounded-0 w-100 fw-bold">
                    <i class="fa-solid fa-paper-plane"></i> Join Now!
                  </button>
                </div>
                <div class="p-4" style={{ backgroundColor: "azure" }}>
                  <p class="p-0">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quasi aliquam magni quos, impedit quibusdam sequi
                    necessitatibus optio cum beatae ducimus molestiae, aperiam
                    voluptatum nemo qui!
                  </p>
                </div>
                <div class="border mt-3 p-4">
                  <p class="p-0">
                    Lorem, amet consectetur adipisicing elit. ipsum dolor sit
                    amet consectetur adipisicing elit.{" "}
                  </p>
                </div>
                <div class="border mt-3 p-4">
                  <p class="p-0">
                    Lorem, amet consectetur adipisicing elit. ipsum dolor sit
                    amet consectetur adipisicing elit.{" "}
                  </p>
                </div>
                <div class="border mt-3 p-4">
                  <p class="p-0">
                    Lorem, amet consectetur adipisicing elit. ipsum dolor sit
                    amet consectetur adipisicing elit.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="container d-flex justify-content-center">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <Link class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </Link>
                </li>
                <li class="page-item">
                  <Link class="page-link" href="#">
                    1
                  </Link>
                </li>
                <li class="page-item">
                  <Link class="page-link" href="#">
                    2
                  </Link>
                </li>
                <li class="page-item">
                  <Link class="page-link" href="#">
                    3
                  </Link>
                </li>
                <li class="page-item">
                  <Link class="page-link" href="#" aria-label="Next">
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
