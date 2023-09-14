import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CompDetailTour({ data }) {
  console.log(data);
  return (
    <div className="main-content bg-white">
      <div className="rs-breadcrumbs breadcrumbs-overlay">
        <div className="breadcrumbs-img">
          <Image
            src={`${process.env.NEXT_PUBLIC_HOST}assets/images/breadcrumbs/9.png`}
            alt="Breadcrumbs Image"
            width={500}
            height={500}
          />
        </div>
        <div className="breadcrumbs-text white-color">
          <h1
            className="page-title white-color wow fadeInUp"
            data-wow-delay="300ms"
            data-wow-duration="2000ms"
          >
            {data.title}
          </h1>
          <div
            className="sec-title mb-40 md-mb-20 wow fadeInUp"
            data-wow-delay="300ms"
            data-wow-duration="2000ms"
          >
            <div className="desc text-center col-md-6 mx-auto">{data.body}</div>
            <ul className="my-3 white-color">
              <li>
                <Link className="active" href="/">
                  Home
                </Link>
              </li>
              <li>Destinations</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="rs-services home12-styl">
        <div id="tour-packages" className="pb-100 md-pt-70 md-pb-70">
          <div className="container py-5">
            <div className="row">
              <div className="mb-5">
                <h1>{data.title}</h1>
                <ul className="blog-meta">
                  <li>
                    <small className="border p-2 px-3">
                      <i className="fa-solid fa-calendar-check-o"></i> 8 Aug
                      2023 - 10 Aug 2023
                    </small>
                  </li>
                </ul>
              </div>
              <div className="col">
                <Image
                  src={process.env.NEXT_PUBLIC_HOSTNAME + data.picture}
                  className="round-circle shadow-lg p-3 mb-5 bg-body-tertiary rounded w-1/2"
                  alt={data.description}
                  width={1000}
                  height={1000}
                />
              </div>
              {/* <div className="col">
                <Image
                  src={`${process.env.NEXT_PUBLIC_HOST}assets/images/events-detail/2.jpg`}
                  className="round-circle shadow-lg p-3 mb-5 bg-body-tertiary rounded"
                  width={500}
                  height={500}
                />
              </div>
              <div className="col">
                <Image
                  src={`${process.env.NEXT_PUBLIC_HOST}assets/images/events-detail/3.jpg`}
                  className="round-circle shadow-lg p-3 mb-5 bg-body-tertiary rounded"
                  width={500}
                  height={500}
                />
              </div> */}
              <div className="mt-3">
                <p className="text-left border-black">{data.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
