"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer({ data }) {
  const [isVisible, setIsVisible] = useState(false);

  const toogleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  function HTMLRenderer({ htmlString }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toogleVisibility);
    return () => {
      window.removeEventListener("scroll", toogleVisibility);
    };
  }, []);

  return (
    <>
      <footer
        id="rs-footer"
        className="rs-footer pt-5"
        style={{
          backgroundImage: `url(${
            process.env.NEXT_PUBLIC_HOST + "assets/images/bg/ct-bg.jpg"
          })`,
        }}
      >
        <div className="footer-top">
          <div className="rs-cta py-5">
            <div className="cta-content text-center">
              <div className="sec-title mb-40 md-mb-20">
                <div className="desc text-white fs-3">
                  We'd love to hear from you! Whether you have a question,
                  suggestion, or just want to say hello, we're here to listen.
                  Get in touch with us
                </div>
              </div>
              <div className="btn-part pb-5">
                <Link className="readon orange-btn rounded-0" href="#">
                  <i className="fa-brands fa-whatsapp mr-1"></i> Contact Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container py-5">
            <div className="row y-middle">
              <div className="col-lg-4 md-mb-20">
                <div className="text-center md-text-start text-white flex">
                  <p className="text-white">
                    @copyright 2023 All right reserved ||
                  </p>
                  <Link
                    href={process.env.NEXT_PUBLIC_HOST}
                    className="text-white"
                  >
                    www.gotravpapua.com
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 md-mb-20 text-center">
                <ul className="footer-social">
                  <li>
                    <Link href={data.facebook} className="rounded-0">
                      <i className="fa-brands fa-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href={data.twitter} className="rounded-0">
                      <i className="fa-brands fa-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href={data.instagram} className="rounded-0">
                      <i className="fa-brands fa-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="rounded-0">
                      <i className="fa-brands fa-google-plus"></i>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 text-end md-text-start">
                <ul className="row list-inline">
                  <li className="col-auto">
                    <Link className="text-white" href="#">
                      Site Map
                    </Link>
                  </li>
                  <li className="col-auto">
                    <Link className="text-white" href="#">
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="col-auto">
                    <Link className="text-white" href="#">
                      Term & Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div
        className={`scroll-to-top-button ${
          isVisible ? "visible" : ""
        }  hover:bg-red-700`}
        onClick={scrollToTop}
      >
        <i className="fa fa-angle-up"></i>
      </div>
      <div
        className="modal fade search-modal"
        id="searchModal"
        tabindex="-1"
        aria-labelledby="searchModalLabel"
        aria-hidden="true"
      >
        <button type="button" className="close" data-bs-dismiss="modal">
          <span className="flaticon-cross"></span>
        </button>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="search-block clearfix">
              <form>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Search Here..."
                    type="text"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
