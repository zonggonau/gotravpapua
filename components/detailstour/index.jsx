import RightBar from "@/config/rightbar/rightbar";
import { potongPargraf } from "@/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CompDetailTour({ data, category, slug }) {
  const changeSlug = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return (
    <div className="main-content bg-white">
      <div className="rs-breadcrumbs breadcrumbs-overlay">
        {/* <div className="breadcrumbs-img">
          <Image
            src={process.env.NEXT_PUBLIC_HOSTNAME + data.picture}
            alt="Breadcrumbs Image"
            className="h-100"
            width={1000}
            height={5000}
            loading="lazy"
          />
        </div> */}
        <div className="breadcrumbs-text white-color">
          {/* <h1
            className="page-title white-color wow fadeInUp"
            data-wow-delay="300ms"
            data-wow-duration="2000ms"
          >
            {data.title}
          </h1> */}
          <div
            className="sec-title mb-40 md-mb-20 wow fadeInUp "
            data-wow-delay="300ms"
            data-wow-duration="2000ms"
          >
            {/* <div className="desc text-center col-md-6 mx-auto">
              {potongPargraf(data.description)}
            </div> */}
            <ul className="my-3">
              <li>
                <Link className="active text-black" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="active" href={`/${category}`}>
                  {category}
                </Link>
              </li>
              <li>{slug}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container pt-10 pb-24">
        <div className="row">
          <div className="mx-auto col-lg-8 pr-60 md-pr-15 md-mb-30 mb-0">
            <div
              className="mb-4"
              style={{
                borderBottomStyle: "dotted",
                borderBottomColor: "#ccc",
              }}
            >
              <div className="row no-gutter white-bg blog-item border-0">
                <div className="columns-2xl">
                  <div className="rs-services home12-styl">
                    <div className="container py-5">
                      <div class="pb-3 text-black text-lg">
                        <Link href="/">Home</Link> &gt;
                        <Link href={`/${category}`}>{changeSlug}</Link>
                        <Link href="#" className="disabled"></Link> &gt;{" "}
                        {data.title}
                      </div>
                      <div className="">
                        <div className="">
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_HOSTNAME + data.picture
                            }
                            className="round-circle shadow-lg  mb-5 bg-body-tertiary rounded"
                            alt={data.description}
                            width={1000}
                            height={1000}
                          />
                        </div>
                        <div className="mb-3">
                          <h2>{data.title}</h2>
                          {/* <ul className="blog-meta">
                            <li>
                              <small className="border p-2 px-3">
                                <i className="fa-solid fa-calendar-check-o"></i>{" "}
                                8 Aug 2023 - 10 Aug 2023
                              </small>
                            </li>
                          </ul> */}
                        </div>

                        <div className="mt-3">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: data.body,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <RightBar /> */}
        </div>
      </div>
    </div>
  );
}
