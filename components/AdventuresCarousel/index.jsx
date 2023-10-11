"use client";
import Link from "next/link";
import useSWR from "swr";
import Image from "next/image";
import { endpoint, fetcher } from "@/data/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function AdventuresCarousel() {
  const { data, error, isLoading } = useSWR(endpoint.touradventures, fetcher);
  var settings = {
    className: "center",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    autoplay: true,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    appendDots: (dots) => <ul>{dots}</ul>,
  };

  if (error) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;

  const sortedData = [...data.data.data].sort((a) => a.id);

  const RenderCarousel = () => {
    return (
      <Slider {...settings}>
        {sortedData.map((item, index) => {
          return (
            <div className="courses-item space-y-5 justify-center" key={index}>
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
                    className="categories text-white text-xl"
                    href={"tour-adventures/" + item.slug}
                  >
                    {item.title}
                  </Link>
                </span>
              </div>
            </div>
          );
        })}
      </Slider>
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
