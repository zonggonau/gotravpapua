import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dataCarouselHero } from "@/data";
export default function TourPackages({ title }) {
  return (
    <>
      <div class="main-content bg-white">
        <div class="rs-breadcrumbs breadcrumbs-overlay">
          <div class="breadcrumbs-img">
            <Image
              className="h-96"
              src={process.env.NEXT_PUBLIC_HOST + dataCarouselHero[1].imageUrl}
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
              Toure Packages
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
                <li>Toure Packages</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-success d-flex justify-content-center py-5">
          <div class="row">
            <div class="col-md-4">
              <div class="destinations">
                <button
                  class="btn btn-outline-light btn-lg dropdown-toggle rounded-0"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Destinations
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <Link class="dropdown-item" href="#">
                      Raja Ampat
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" href="#">
                      Nabire
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" href="#">
                      Jayapura
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-md-4">
              <div class="duration">
                <button
                  class="btn btn-outline-light btn-lg dropdown-toggle rounded-0"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Duration
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <Link class="dropdown-item" href="#">
                      1 - 2 Days
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" href="#">
                      3 - 5 Days
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" href="#">
                      1 Week
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" href="#">
                      Custom
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-md-4">
              <button class="btn btn-light btn-lg rounded-0 filter-btn">
                <i class="fa-solid fa-search"></i>
                Filter Packages
              </button>
            </div>
          </div>
        </div>

        <div
          id="tour-packages"
          class="rs-popular-courses main-home event-bg pt-100 pb-100 md-pt-70 md-pb-70"
        >
          <div class="container py-5">
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-24">
                <div class="courses-item">
                  <div class="courses-grid">
                    <div class="img-part">
                      <Link href="#">
                        <img
                          src="assets/images/tour-packages/2.png"
                          class="w-100"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div class="content-part">
                      <h3 class="title">
                        <Link href="#">Papuan Paradise Expedition</Link>
                      </h3>
                      <ul class="meta-part">
                        <li>
                          <i class="fa fa-calendar-check-o"></i>5 Days
                        </li>
                        <li>
                          <i class="fa fa-map-marker"></i>
                          Nabire
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-6 mb-24">
                <div class="courses-item">
                  <div class="courses-grid">
                    <div class="img-part">
                      <Link href="#">
                        <img
                          src="assets/images/tour-packages/4.png"
                          class="w-100"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div class="content-part">
                      <h3 class="title">
                        <Link href="#">Papuan Cultural Immersion</Link>
                      </h3>
                      <ul class="meta-part">
                        <li>
                          <i class="fa fa-calendar-check-o"></i>5 Days
                        </li>
                        <li>
                          <i class="fa fa-map-marker"></i>
                          Nabire
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-6 mb-24">
                <div class="courses-item">
                  <div class="courses-grid">
                    <div class="img-part">
                      <Link href="#">
                        <img
                          src="assets/images/tour-packages/6.png"
                          class="w-100"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div class="content-part">
                      <h3 class="title">
                        <Link href="#">Papuan Diving Expedition</Link>
                      </h3>
                      <ul class="meta-part">
                        <li>
                          <i class="fa fa-calendar-check-o"></i>5 Days
                        </li>
                        <li>
                          <i class="fa fa-map-marker"></i>
                          Nabire
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-6 mb-24">
                <div class="courses-item">
                  <div class="courses-grid">
                    <div class="img-part">
                      <Link href="#">
                        <img
                          src="assets/images/tour-packages/5.png"
                          class="w-100"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div class="content-part">
                      <h3 class="title">
                        <Link href="#">Papuan Highlands Adventure</Link>
                      </h3>
                      <ul class="meta-part">
                        <li>
                          <i class="fa fa-calendar-check-o"></i>5 Days
                        </li>
                        <li>
                          <i class="fa fa-map-marker"></i>
                          Nabire
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-6 mb-24">
                <div class="courses-item">
                  <div class="courses-grid">
                    <div class="img-part">
                      <Link href="#">
                        <img
                          src="assets/images/tour-packages/1.png"
                          class="w-100"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div class="content-part">
                      <h3 class="title">
                        <Link href="#">Motorcycle Retreat</Link>
                      </h3>
                      <ul class="meta-part">
                        <li>
                          <i class="fa fa-calendar-check-o"></i>5 Days
                        </li>
                        <li>
                          <i class="fa fa-map-marker"></i>
                          Nabire
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-6 mb-24">
                <div class="courses-item">
                  <div class="courses-grid">
                    <div class="img-part">
                      <Link href="#">
                        <img
                          src="assets/images/tour-packages/3.png"
                          class="w-100"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div class="content-part">
                      <h3 class="title">
                        <Link href="#">Surfing On The Beach</Link>
                      </h3>
                      <ul class="meta-part">
                        <li>
                          <i class="fa fa-calendar-check-o"></i> 5 Days
                        </li>
                        <li>
                          <i class="fa fa-map-marker"></i> Nabire
                        </li>
                      </ul>
                    </div>
                  </div>
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
