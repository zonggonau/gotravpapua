import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dataCarouselHero } from "@/data";
import { getDataTourDestination } from "@/data/api";

export default async function Destinations() {
  const { data } = await getDataTourDestination();
  console.log(data);
  return (
    <>
      <div class="main-content bg-white">
        <div class="rs-breadcrumbs breadcrumbs-overlay">
          <div class="breadcrumbs-img">
            <Image
              className="h-96"
              src={
                process.env.NEXT_PUBLIC_HOSTNAME + dataCarouselHero[5].imageUrl
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
              Destinations
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
                <li>Destinations</li>
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
                    placeholder="Search . . ."
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
              {data.map((item, index) => {
                console.log(item.picture);
                return (
                  <div class="col-lg-6 pr-60 md-pr-15 md-mb-30" key={index}>
                    <div class="row no-gutter white-bg blog-item mb-35">
                      <div class="col-md-6">
                        <div class="image-part h-100">
                          <Link href="#">
                            <Image
                              src={
                                process.env.NEXT_PUBLIC_HOSTNAME + item.picture
                              }
                              class="w-100"
                              alt=""
                              width={500}
                              height={500}
                            />
                          </Link>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="blog-content">
                          <h3 class="title">
                            <Link href="blog-single.html">{item.title}</Link>
                          </h3>
                          <ul class="blog-meta">
                            <li>
                              <i class="fa-solid fa-map-marker"></i> Nabire
                            </li>
                          </ul>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
