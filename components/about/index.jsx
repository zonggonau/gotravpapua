import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function About() {
  return (
    <>
      <div
        id="about"
        className="rs-about style1 pt-100 pb-100 md-pt-70 md-pb-70"
      >
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 pl-60 md-pl-15 md-mb-60">
              <div className="img-part media-icon orange-color">
                <Link
                  className="popup-videos"
                  href="https://www.youtube.com/watch?v=atMUy_bPoQI"
                >
                  <i className="fa fa-play"></i>
                </Link>
                <Image
                  src={`${process.env.NEXT_PUBLIC_HOST}assets/images/adventures/5.png`}
                  alt="#"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="sec-title mb-26">
                <div className="desc pr-30">
                  <p className="mb-3 display-3 fw-bold text-dark">
                    GOTRAV Papua!
                  </p>
                  <p className="mb-3 fs-4">
                    Your gateway to exploring the enchanting beauty of Papua
                  </p>
                  <p className="mb-0">
                    As a premier travel agency in this breathtaking region, we
                    curate unforgettable experiences for adventurers and nature
                    enthusiasts alike. Our expert team is passionate about
                    showcasing the rich cultural heritage, lush landscapes, and
                    diverse wildlife that make Papua a truly unique destination.
                    With personalized itineraries and top-notch services, we
                    ensure every journey with us is filled with awe-inspiring
                    moments and cherished memories. Embark on a
                    once-in-a-lifetime adventure with GOTRAV Papua and discover
                    the hidden gems of this remarkable Indonesian paradise.
                  </p>
                </div>
              </div>
              <div className="btn-part">
                <Link
                  className="readon main-home rounded-0 bg-success text-white"
                  href="#tour-packages"
                >
                  Tour Packages <i className="fa-solid fa-arrow-right ms-3"></i>
                </Link>
                <Link
                  className="readon main-home rounded-0"
                  href="#our-adventures"
                >
                  Our Adventures
                  <i className="fa-solid fa-arrow-right ms-3"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
