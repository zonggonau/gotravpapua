import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Categories } from "@/data";

export default function Nav() {
  const [showSubNavbar, setShowSubNavbar] = useState(true);

  const [activeMenu, setActiveMenu] = useState("");
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowSubNavbar(false);
      console.log("false");
    } else {
      setShowSubNavbar(true);
      console.log("true");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // window.removeEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showSubNavbar]);

  return (
    <>
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
                        info@gotravpapua.com
                      </Link>
                    </li>
                    <li>
                      <i className="fa flaticon-call"></i>
                      <Link href="tel:+(+01)999-999-4444">
                        info@gotravpapua.com
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-md-7 text-end">
                  <ul className="toolbar-sl-share">
                    <li className="opening">
                      <i className="fa fa-map-marker"></i> Jl.Eunike Mawene
                      Kimi, Nabire Tengah, Papua Tengah.
                    </li>
                    <li>
                      <Link href="https://facebook.com" target="_blank">
                        <i className="fa-brands fa-facebook"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://twitter.com" target="_blank">
                        <i className="fa-brands fa-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://linkedin.com" target="_blank">
                        <i className="fa-brands fa-linkedin"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://instagram.com" target="_blank">
                        <i className="fa-brands fa-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://youtube.com" target="_blank">
                        <i className="fa-brands fa-youtube"></i>
                      </Link>
                    </li>
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
                          width={500}
                          height={500}
                          style={{ height: "100px" }}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 text-end">
                  <div className="rs-menu-area">
                    <div className="main-menu">
                      <div className="mobile-menu">
                        <Link href="#" className="rs-menu-toggle">
                          <i className="fa fa-bars"></i>
                        </Link>
                      </div>
                      <nav className="rs-menu">
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
                              href="/destinations"
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
                              href="/adventures"
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
                              href="/events"
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
                      {/* <nav className="rs-menu">
                        <ul className="nav-menu">
                          <li className="mega-rs">
                            <Link href="/tour-packages">Tour Packages</Link>
                          </li>
                          <li className="mega-rs">
                            <Link href="/destinations">Destinations</Link>
                          </li>
                          <li className="mega-rs">
                            <Link href="/adventures">Adventures</Link>
                          </li>
                          <li className="mega-rs">
                            <Link href="/events">Events</Link>
                          </li>
                          <li className="mega-rs">
                            <Link href="/contact">Contact</Link>
                          </li>
                        </ul>
                      </nav> */}
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
