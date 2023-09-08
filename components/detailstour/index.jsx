"use client";
import Image from "next/image";
import React from "react";

export default function CompDetailTour({ data }) {
  return (
    <div class="main-content">
      <div class="rs-breadcrumbs breadcrumbs-overlay">
        <div class="breadcrumbs-img">
          <Image
            src={`${process.env.NEXT_PUBLIC_HOST}assets/images/breadcrumbs/9.png`}
            alt="Breadcrumbs Image"
            width={500}
            height={500}
          />
        </div>
        <div class="breadcrumbs-text white-color">
          <h1
            class="page-title white-color wow fadeInUp"
            data-wow-delay="300ms"
            data-wow-duration="2000ms"
          >
            Events-Detail
          </h1>
          <div
            class="sec-title mb-40 md-mb-20 wow fadeInUp"
            data-wow-delay="300ms"
            data-wow-duration="2000ms"
          >
            <div class="desc text-center col-md-6 mx-auto">
              Discover the untouched beauty of Papua with our Papuan Paradise
              Expedition, Coastal Retreat, Wildlife Safari, Cultural Immersion,
              Diving Expedition, Highlands Adventure, River Expedition, and many
              more
            </div>
            <ul class="my-3 white-color">
              <li>
                <a class="active" href="index.html">
                  Home
                </a>
              </li>
              <li>Destinations</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="rs-services home12-style">
        <div id="tour-packages" class=" pt-100 pb-100 md-pt-70 md-pb-70">
          <div class="container py-5">
            <div class="row">
              <div class="mb-5">
                <h1>{data.title}</h1>
                <ul class="blog-meta">
                  <li>
                    <small class="border p-2 px-3">
                      <i class="fa-solid fa-calendar-check-o"></i> 8 Aug 2023 -
                      10 Aug 2023
                    </small>
                  </li>
                </ul>
              </div>
              <div class="col">
                <Image
                  src={process.env.NEXT_PUBLIC_HOSTNAME + data.picture}
                  class="round-circle shadow-lg p-3 mb-5 bg-body-tertiary rounded"
                  width={1000}
                  height={1000}
                />
              </div>
              {/* <div class="col">
                <Image
                  src={`${process.env.NEXT_PUBLIC_HOST}assets/images/events-detail/2.jpg`}
                  class="round-circle shadow-lg p-3 mb-5 bg-body-tertiary rounded"
                  width={500}
                  height={500}
                />
              </div>
              <div class="col">
                <Image
                  src={`${process.env.NEXT_PUBLIC_HOST}assets/images/events-detail/3.jpg`}
                  class="round-circle shadow-lg p-3 mb-5 bg-body-tertiary rounded"
                  width={500}
                  height={500}
                />
              </div> */}
              <div class="mt-3">
                <p class="text-center border-black">{data.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
