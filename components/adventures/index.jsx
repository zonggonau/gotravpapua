import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dataCarouselHero } from "@/data";

export default function Adventure() {
  return (
    <>
      <div class="main-content bg-white">
        <div class="rs-breadcrumbs breadcrumbs-overlay">
          <div class="breadcrumbs-img">
            <Image
              className="h-96"
              src={process.env.NEXT_PUBLIC_HOST + dataCarouselHero[4].imageUrl}
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
              Adventures
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
                <li>Adventures</li>
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

        <div class="rs-gallery pt-100 pb-100 md-pt-70 md-pb-70">
          <div class="container">
            <div class="row">
              <div class="col-lg-4 mb-30 col-md-6">
                <div class="gallery-item">
                  <div class="gallery-img">
                    <Link
                      class="image-popup"
                      href="assets/images/adventures/1.png"
                    >
                      <img src="assets/images/adventures/1.png" alt="" />
                    </Link>
                  </div>
                  <div class="title fs-2 fw-bold text-success">
                    Motorcycle Tours
                  </div>
                </div>
              </div>

              <div class="col-lg-4 mb-30 col-md-6">
                <div class="gallery-item">
                  <div class="gallery-img">
                    <Link
                      class="image-popup"
                      href="assets/images/adventures/2.png"
                    >
                      <img src="assets/images/adventures/2.png" alt="" />
                    </Link>
                  </div>
                  <div class="title fs-2 fw-bold text-success">
                    Wildlife Conservation Expeditions
                  </div>
                </div>
              </div>

              <div class="col-lg-4 mb-30 col-md-6">
                <div class="gallery-item">
                  <div class="gallery-img">
                    <Link
                      class="image-popup"
                      href="assets/images/adventures/3.png"
                    >
                      <img src="assets/images/adventures/3.png" alt="" />
                    </Link>
                  </div>
                  <div class="title fs-2 fw-bold text-success">
                    Surfing and Windsurfing
                  </div>
                </div>
              </div>

              <div class="col-lg-4 mb-30 col-md-6">
                <div class="gallery-item">
                  <div class="gallery-img">
                    <Link
                      class="image-popup"
                      href="assets/images/adventures/4.png"
                    >
                      <img src="assets/images/adventures/4.png" alt="" />
                    </Link>
                  </div>
                  <div class="title fs-2 fw-bold text-success">
                    Cultural Immersion
                  </div>
                </div>
              </div>

              <div class="col-lg-4 mb-30 col-md-6">
                <div class="gallery-item">
                  <div class="gallery-img">
                    <Link
                      class="image-popup"
                      href="assets/images/adventures/5.png"
                    >
                      <img src="assets/images/adventures/5.png" alt="" />
                    </Link>
                  </div>
                  <div class="title fs-2 fw-bold text-success">
                    Hiking and Trekking
                  </div>
                </div>
              </div>

              <div class="col-lg-4 mb-30 col-md-6">
                <div class="gallery-item">
                  <div class="gallery-img">
                    <Link
                      class="image-popup"
                      href="assets/images/adventures/6.png"
                    >
                      <img src="assets/images/adventures/6.png" alt="" />
                    </Link>
                  </div>
                  <div class="title fs-2 fw-bold text-success">
                    Scuba Diving and Snorkeling
                  </div>
                </div>
              </div>

              <div class="col-lg-4 mb-30 col-md-6">
                <div class="gallery-item">
                  <div class="gallery-img">
                    <Link
                      class="image-popup"
                      href="assets/images/adventures/1.png"
                    >
                      <img src="assets/images/adventures/1.png" alt="" />
                    </Link>
                  </div>
                  <div class="title fs-2 fw-bold text-success">
                    Motorcycle Tours
                  </div>
                </div>
              </div>

              <div class="col-lg-4 mb-30 col-md-6">
                <div class="gallery-item">
                  <div class="gallery-img">
                    <Link
                      class="image-popup"
                      href="assets/images/adventures/2.png"
                    >
                      <img src="assets/images/adventures/2.png" alt="" />
                    </Link>
                  </div>
                  <div class="title fs-2 fw-bold text-success">
                    Wildlife Conservation Expeditions
                  </div>
                </div>
              </div>

              <div class="col-lg-4 mb-30 col-md-6">
                <div class="gallery-item">
                  <div class="gallery-img">
                    <Link
                      class="image-popup"
                      href="assets/images/adventures/3.png"
                    >
                      <img src="assets/images/adventures/3.png" alt="" />
                    </Link>
                  </div>
                  <div class="title fs-2 fw-bold text-success">
                    Surfing and Windsurfing
                  </div>
                </div>
              </div>

              <div class="col-lg-4 mb-30 col-md-6">
                <div class="gallery-item">
                  <div class="gallery-img">
                    <Link
                      class="image-popup"
                      href="assets/images/adventures/4.png"
                    >
                      <img src="assets/images/adventures/4.png" alt="" />
                    </Link>
                  </div>
                  <div class="title fs-2 fw-bold text-success">
                    Cultural Immersion
                  </div>
                </div>
              </div>

              <div class="col-lg-4 mb-30 col-md-6">
                <div class="gallery-item">
                  <div class="gallery-img">
                    <Link
                      class="image-popup"
                      href="assets/images/adventures/5.png"
                    >
                      <img src="assets/images/adventures/5.png" alt="" />
                    </Link>
                  </div>
                  <div class="title fs-2 fw-bold text-success">
                    Hiking and Trekking
                  </div>
                </div>
              </div>

              <div class="col-lg-4 mb-30 col-md-6">
                <div class="gallery-item">
                  <div class="gallery-img">
                    <Link
                      class="image-popup"
                      href="assets/images/adventures/6.png"
                    >
                      <img src="assets/images/adventures/6.png" alt="" />
                    </Link>
                  </div>
                  <div class="title fs-2 fw-bold text-success">
                    Scuba Diving and Snorkeling
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
