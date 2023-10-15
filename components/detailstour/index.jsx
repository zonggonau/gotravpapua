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
    <div className="main-content bg-stone-100">
      <div className="container pt-10 pb-24">
        <div className="row">
          <div className="mx-auto col-lg-8  bg-white shadow-sm">
            <div class="mt-10 text-black text-lg">
              <Link href="/">Home</Link> &gt;
              <Link href={`/${category}`}>{changeSlug}</Link>
              <Link href="#" className="disabled"></Link> &gt; {data.title}
            </div>
            <div className="mt-10">
              <Image
                src={process.env.NEXT_PUBLIC_HOSTNAME + data.picture}
                className="round-circle shadow-lg mb-5 bg-body-tertiary rounded"
                alt={data.description}
                width={1000}
                height={1000}
              />
            </div>
            <div className="mb-1">
              <h2 className="font-extrabold">{data.title}</h2>
              {/* <ul className="blog-meta">
                            <li>
                              <small className="border p-2 px-3">
                                <i className="fa-solid fa-calendar-check-o"></i>{" "}
                                8 Aug 2023 - 10 Aug 2023
                              </small>
                            </li>
                          </ul> */}
            </div>
            <div className="mb-56">
              <div
                dangerouslySetInnerHTML={{
                  __html: data.body,
                }}
              ></div>
            </div>
          </div>
          {/* <RightBar /> */}
        </div>
      </div>
    </div>
  );
}
