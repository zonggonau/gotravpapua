"use client";
import Link from "next/link";
import useSWR from "swr";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { endpoint, fetcher } from "@/data/api";
export default function Nav() {
  const { data, error, isLoading } = useSWR(endpoint.settings, fetcher);
  const [showSubNavbar, setShowSubNavbar] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("");
  const [loading, setLoading] = useState(true);

  const handleMenuClick = (menu) => {
    loadingTime();
    setActiveMenu(menu);
    setIsOpen(true);
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowSubNavbar(false);
    } else {
      setShowSubNavbar(true);
    }
  };

  const MenuHandle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2500);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [showSubNavbar]);

  const loadingTime = () => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2500);
    setLoading(true);
  };

  const hideLoader = () => {
    if (loading) {
      return (
        <div id="loader" className="loader green-color">
          <div className="loader-container">
            <div className="loader-icon">
              <Image
                src={`${process.env.NEXT_PUBLIC_HOST}assets/images/pre-load-gotrav.png`}
                width={100}
                height={100}
                alt="pre load gotrav"
              />
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  // console.log(data.data);

  if (error) return <div>Error</div>;
  if (isLoading)
    return (
      <div id="loader" className="loader green-color">
        <div className="loader-container">
          <div className="loader-icon">
            <Image
              src={`${process.env.NEXT_PUBLIC_HOST}assets/images/pre-load-gotrav.png`}
              width={100}
              height={100}
              alt="pre load gotrav"
            />
          </div>
        </div>
      </div>
    );

  return (
    <>
      {hideLoader()}
      <div className="full-width-header header-style1 home1-modifiy home12-modifiy">
        <header id="rs-header" className="rs-header">
          <div
            className={`topbar-area home11-topbar fixed ${
              showSubNavbar ? "" : "hidden"
            }`}
          >
            <div className="container">
              <div className="row y-middle">
                <div className="col-md-5">
                  <ul className="topbar-contact">
                    <li>
                      <i className="flaticon-email"></i>
                      <Link href={"mailto:support@rstheme.com"}>
                        {data.data.email_address}
                      </Link>
                    </li>
                    <li>
                      <i className="fa flaticon-call"></i>
                      <Link href="tel:+(+01)999-999-4444">
                        {data.data.telephone}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-md-7 text-end">
                  <ul className="toolbar-sl-share">
                    <li className="opening">
                      <i className="fa fa-map-marker"></i>
                      {data.data.office_address}
                    </li>
                    {data.data.facebook === null ? (
                      ""
                    ) : (
                      <li>
                        <Link
                          href={
                            data.data.facebook === null
                              ? ""
                              : data.data.facebook
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
                            data.data.linkedin === null
                              ? ""
                              : data.data.linkedin
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

          <div
            className={`menu-area menu-sticky ${showSubNavbar ? "" : "sticky"}`}
          >
            <div className="container">
              <div className="row y-middle">
                <div className="col-lg-2">
                  <div className="logo-cat-wrap">
                    <div className="logo-part">
                      <Link href="/" onClick={() => handleMenuClick("/")}>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_HOST}assets/images/logo.png`}
                          alt=""
                          width={150}
                          height={500}
                          style={{ height: "100px" }}
                        />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-lg-8 text-end">
                  <div className="rs-menu-area flex">
                    <div className="main-menu">
                      <div
                        className={`mobile-menu ${
                          isOpen == true
                            ? "rs-menu-toggle-close"
                            : "rs-menu-toggle-open"
                        }`}
                      >
                        <Link
                          href="/"
                          className="rs-menu-toggle"
                          onClick={() => MenuHandle()}
                        >
                          {isOpen == true ? (
                            <i className="fa fa-bars"></i>
                          ) : (
                            <i className="fa fa-close"></i>
                          )}
                        </Link>
                      </div>
                      <nav
                        className={`rs-menu ${
                          isOpen == true ? "rs-menu-close" : ""
                        }`}
                      >
                        <ul className="nav-menu">
                          <li
                            className={`mega-rs ${
                              activeMenu === "tour-packages"
                                ? "current-menu-item"
                                : ""
                            }`}
                          >
                            <Link
                              href="/tour-packages"
                              onClick={() => handleMenuClick("tour-packages")}
                            >
                              Tour Packages
                            </Link>
                          </li>
                          <li
                            className={`mega-rs ${
                              activeMenu === "tour-destinations"
                                ? "current-menu-item"
                                : ""
                            }`}
                          >
                            <Link
                              href="/tour-destinations"
                              onClick={() =>
                                handleMenuClick("tour-destinations")
                              }
                            >
                              Destinations
                            </Link>
                          </li>
                          <li
                            className={`mega-rs ${
                              activeMenu === "tour-adventures"
                                ? "current-menu-item"
                                : ""
                            }`}
                          >
                            <Link
                              href="/tour-adventures"
                              onClick={() => handleMenuClick("tour-adventures")}
                            >
                              Adventures
                            </Link>
                          </li>
                          <li
                            className={`mega-rs ${
                              activeMenu === "tour-events"
                                ? "current-menu-item"
                                : ""
                            }`}
                          >
                            <Link
                              href="/tour-events"
                              onClick={() => handleMenuClick("tour-events")}
                            >
                              Events
                            </Link>
                          </li>
                          <li
                            className={`mega-rs ${
                              activeMenu === "contact"
                                ? "current-menu-item"
                                : ""
                            }`}
                          >
                            <Link
                              href="/contact"
                              onClick={() => handleMenuClick("contact")}
                            >
                              Contact
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
