"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { endpoint, fetcher } from "@/data/api";
import Link from "next/link";

export default function Footer() {
  const { data, error, isLoading } = useSWR(endpoint.settings, fetcher);
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

  if (error) return <div>Error</div>;
  if (isLoading) return "";

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
                <Link
                  className="readon orange-btn rounded-0"
                  href={`tel:${data.data.telephone}`}
                >
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
                  {data.data.facebook === null ? (
                    ""
                  ) : (
                    <li>
                      <Link
                        href={
                          data.data.facebook === null ? "" : data.data.facebook
                        }
                        target="_blank"
                      >
                        <i className="fa-brands fa-facebook"></i>
                      </Link>
                    </li>
                  )}

                  {data.data.twitter === null ? (
                    ""
                  ) : (
                    <li>
                      <Link
                        href={
                          data.data.twitter === null ? "" : data.data.twitter
                        }
                        target="_blank"
                      >
                        <i className="fa-brands fa-twitter"></i>
                      </Link>
                    </li>
                  )}

                  {data.data.linkedin === null ? (
                    ""
                  ) : (
                    <li>
                      <Link
                        href={
                          data.data.linkedin === null ? "" : data.data.linkedin
                        }
                        target="_blank"
                      >
                        <i className="fa-brands fa-linkedin"></i>
                      </Link>
                    </li>
                  )}
                  {data.data.youtube === null ? (
                    ""
                  ) : (
                    <li>
                      <Link
                        href={
                          data.data.youtube === null ? "" : data.data.youtube
                        }
                        target="_blank"
                      >
                        <i className="fa-brands fa-youtube"></i>
                      </Link>
                    </li>
                  )}
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
