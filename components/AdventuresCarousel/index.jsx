"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import Carousel from "@itseasy21/react-elastic-carousel";
import Image from "next/image";
// import "./styles.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 3 },
];

export default function AdventuresCarousel({ data }) {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  const addItem = () => {
    const nextItem = Math.max(1, items.length + 1);
    setItems([...items, nextItem]);
  };

  const removeItem = () => {
    const endRange = Math.max(0, items.length - 1);
    setItems(items.slice(0, endRange));
  };

  const RenderCarousel = () => {
    return (
      <div className="App">
        <hr className="seperator" />
        <div className="carousel-wrapper">
          <Carousel
            breakPoints={breakPoints}
            showArrows={false}
            autoPlaySpeed={5000}
          >
            {data.map((item, index) => {
              if (item.status === "Publish") {
                return (
                  <div className="courses-item space-y-5" key={index}>
                    <div className="img-part">
                      <Image
                        className="h-72"
                        src={process.env.NEXT_PUBLIC_HOSTNAME + item.picture}
                        alt={item.title}
                        width={380}
                        height={500}
                      />
                    </div>
                    <div className="content-part">
                      <span className="fs-2 fw-bold">
                        <Link
                          className="categories  d-block text-white text-lg"
                          href="#"
                        >
                          {item.title}
                        </Link>
                      </span>
                    </div>
                  </div>
                );
              }
            })}
          </Carousel>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        id="our-adventures"
        className="rs-testimonial main-home pt-100 pb-100 md-pt-70 md-pb-70"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_HOST}/assets/images/slider/7.png)`,
          backgroundSize: "cover",
        }}
      >
        <div className="container py-5">
          <div className="row y-middle mb-50">
            <div className="col-md-4 sm-mb-30">
              <div className="sec-title">
                <h2 className="tsl-title mb-0 text-white display-4 fw-bold">
                  ADVENTURES
                </h2>
              </div>
            </div>
            <div className="col-md-8 text-white fs-4">
              Join the quest of a lifetime, as you traverse mystical lands,
              unlock arcane secrets, and become a legend in this captivating
              tale of courage and discovery.
            </div>
          </div>
          <RenderCarousel />
        </div>
      </div>
    </>
  );
}
