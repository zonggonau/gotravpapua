import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Categories } from "@/data";

export default function Nav() {
  const [showSubNavbar, setShowSubNavbar] = useState(true);

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
      {/* <div id="loader" class="loader green-color">
        <div class="loader-container">
          <div class="loader-icon">
            <img
              src="assets/images/pre-load-gotrav.png"
              alt="pre load gotrav"
            />
          </div>
        </div>
      </div> */}

      <div class="full-width-header header-style1 home1-modifiy home12-modifiy">
        <header id="rs-header" class="rs-header">
          <div
            class={`topbar-area home11-topbar fixed ${
              showSubNavbar ? "" : "hidden"
            }`}
          >
            <div class="container">
              <div class="row y-middle">
                <div class="col-md-5">
                  <ul class="topbar-contact">
                    <li>
                      <i class="flaticon-email"></i>
                      <Link href={"mailto:support@rstheme.com"}>
                        info@gotravpapua.com
                      </Link>
                    </li>
                    <li>
                      <i class="fa flaticon-call"></i>
                      <Link href="tel:+(+01)999-999-4444">
                        info@gotravpapua.com
                      </Link>
                    </li>
                  </ul>
                </div>
                <div class="col-md-7 text-end">
                  <ul class="toolbar-sl-share">
                    <li class="opening">
                      <i class="fa fa-map-marker"></i> Jl.Eunike Mawene Kimi,
                      Nabire Tengah, Papua Tengah.
                    </li>
                    <li>
                      <Link href="https://facebook.com" target="_blank">
                        <i class="fa-brands fa-facebook"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://twitter.com" target="_blank">
                        <i class="fa-brands fa-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://linkedin.com" target="_blank">
                        <i class="fa-brands fa-linkedin"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://instagram.com" target="_blank">
                        <i class="fa-brands fa-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://youtube.com" target="_blank">
                        <i class="fa-brands fa-youtube"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class={`menu-area menu-sticky ${showSubNavbar ? "" : "sticky"}`}>
            <div class="container">
              <div class="row y-middle">
                <div class="col-lg-2">
                  <div class="logo-cat-wrap">
                    <div class="logo-part">
                      <Link href="/">
                        <img
                          src="assets/images/logo.png"
                          alt=""
                          style={{ height: "100px" }}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                <div class="col-lg-8 text-end">
                  <div class="rs-menu-area">
                    <div class="main-menu">
                      <div class="mobile-menu">
                        <Link href="#" class="rs-menu-toggle">
                          <i class="fa fa-bars"></i>
                        </Link>
                      </div>
                      <nav class="rs-menu">
                        <ul class="nav-menu">
                          {Categories.map((item, index) => {
                            return (
                              <li class="mega-rs">
                                <Link href={item.slug}>{item.name}</Link>
                              </li>
                            );
                          })}
                          {/* <li class="mega-rs">
                            <Link href="/tour-packages">Tour Packages</Link>
                          </li>
                          <li class="mega-rs">
                            <Link href="/destinations">Destinations</Link>
                          </li>
                          <li class="mega-rs">
                            <Link href="/adventures">Adventures</Link>
                          </li>
                          <li class="mega-rs">
                            <Link href="/events">Events</Link>
                          </li>
                          <li class="mega-rs">
                            <Link href="/contact">Contact</Link>
                          </li> */}
                          {/* <li class="menu-item-has-children">
                            <Link href="#">More</Link>
                            <ul class="sub-menu">
                              <li>
                                <Link href="#">Sub Menu</Link>
                              </li>
                              <li>
                                <Link href="#">Sub Menu</Link>
                              </li>
                            </ul>
                          </li> */}
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
