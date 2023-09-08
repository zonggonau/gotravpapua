"use client";
import { useState } from "react";
import Link from "next/link";
import { dataCarouselHero } from "@/data/index";
import { Carousel } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function BootstrapCarousel() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const NextCarousel = () => (
    <div class="bg-green-600 p-3 hover:bg-red-700 rounded-full pt-2 pb-2">
      <i class="fa fa-arrow-right"></i>
    </div>
  );
  const PrevCarousel = () => (
    <div class="bg-green-600 p-3 hover:bg-red-700 rounded-full pt-2 pb-2">
      <i class="fa fa-arrow-left"></i>
    </div>
  );

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      nextIcon={<NextCarousel />}
      prevIcon={<PrevCarousel />}
    >
      {dataCarouselHero.map((item) => (
        <Carousel.Item key={item.id} interval={5000}>
          <div
            className="slider-content"
            style={{
              backgroundImage: `url('${
                process.env.NEXT_PUBLIC_HOSTNAME + item.imageUrl
              }')`,
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          >
            <div className="container">
              <div className="content-part">
                <h1
                  className="sl-title wow fadeInUp"
                  data-wow-delay="600ms"
                  data-wow-duration="2000ms"
                >
                  {item.title}
                </h1>
                <div
                  className="sec-title mb-40 md-mb-20 wow fadeInUp"
                  data-wow-delay="300ms"
                  data-wow-duration="2000ms"
                >
                  <div className="desc white-color wow fadeInUp">
                    {item.desc}
                  </div>
                </div>
                <div className="btn-part">
                  <Link
                    className="readon green-btn main-home wow fadeInUp rounded-0"
                    href="#"
                    data-wow-delay="300ms"
                    data-wow-duration="2000ms"
                  >
                    BEGIN YOUR JOURNEY
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
