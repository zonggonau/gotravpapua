"use client";
import useSWR from "swr";
import { getSliders } from "@/data/api.js";
import { useState } from "react";
import Link from "next/link";
import { Carousel } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function BootstrapCarousel() {
  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_HOST_API + "sliders",
    getSliders
  );

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

  if (error) return <div>ERROR</div>;
  if (isLoading) return <div>Loading..</div>;
  const sortedData = [...data.data];
  sortedData.sort((a, b) => a.id);
  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      nextIcon={<NextCarousel />}
      prevIcon={<PrevCarousel />}
    >
      {sortedData.map((item, index) => {
        return (
          <Carousel.Item key={index} interval={5000}>
            <div
              className="slider-content"
              style={{
                backgroundImage: `url('${
                  process.env.NEXT_PUBLIC_HOSTNAME + item.picture
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
                      {item.description}
                    </div>
                  </div>
                  <div className="btn-part">
                    <Link
                      className="readon green-btn main-home wow fadeInUp rounded-0"
                      href={`tour-events/${item.slug}`}
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
        );
      })}
    </Carousel>
  );
}
