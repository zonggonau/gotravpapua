import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dataCarouselHero } from "@/data";

export default function Contact() {
  return (
    <>
      <div class="main-content bg-white">
        <div class="rs-breadcrumbs breadcrumbs-overlay">
          <div class="breadcrumbs-img">
            <Image
              className="h-96"
              src={process.env.NEXT_PUBLIC_HOST + dataCarouselHero[1].imageUrl}
              alt="Breadcrumbs Image"
              height={700}
              width={1000}
            />
          </div>
          <div class="breadcrumbs-text white-color">
            <h1
              class="page-title white-color wow fadeInUp"
              data-wow-delay="300ms"
              data-wow-duration="2000ms"
            >
              Contact
            </h1>
            <div
              class="sec-title mb-40 md-mb-20 wow fadeInUp"
              data-wow-delay="300ms"
              data-wow-duration="2000ms"
            >
              <div class="desc text-center col-md-6 mx-auto">
                Discover the untouched beauty of Papua with our Papuan Paradise
                Expedition, Coastal Retreat, Wildlife Safari, Cultural
                Immersion, Diving Expedition, Highlands Adventure, River
                Expedition, and many more
              </div>
              <ul class="my-3 white-color">
                <li>
                  <Link class="active" href="index.html">
                    Home
                  </Link>
                </li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="contact-page-section orange-color pt-100 pb-100 md-pt-70 md-pb-70">
          <div class="container">
            <div class="row pb-50">
              <div class="col-12">
                <div class="contact-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8133512.942749398!2d135.6083135923328!3d-5.501216729418526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x684a0316a5130283%3A0xf0d0324058e7ea8!2sNew%20Guinea!5e0!3m2!1sen!2sid!4v1690554991333!5m2!1sen!2sid"
                    width="100%"
                    height="500"
                    style={{ border: 0 }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            <div class="row align-items-end contact-bg1">
              <div class="col-lg-8 lg-pl-0">
                <div class="rs-quick-contact new-style">
                  <div class="inner-part mb-35">
                    <h2 class="title mb-15">Get In Touch</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      eius to mod tempor incidi dunt ut dolore.
                    </p>
                  </div>
                  <div id="form-messages"></div>
                  <form id="contact-form" method="post" action="mailer.php">
                    <div class="row">
                      <div class="col-lg-6 mb-30 col-md-6 col-sm-6">
                        <input
                          class="from-control"
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Name"
                          required=""
                        />
                      </div>
                      <div class="col-lg-6 mb-30 col-md-6 col-sm-6">
                        <input
                          class="from-control"
                          type="text"
                          id="email"
                          name="email"
                          placeholder="Email"
                          required=""
                        />
                      </div>
                      <div class="col-lg-6 mb-30 col-md-6 col-sm-6">
                        <input
                          class="from-control"
                          type="text"
                          id="phone"
                          name="phone"
                          placeholder="Phone"
                          required=""
                        />
                      </div>
                      <div class="col-lg-6 mb-30 col-md-6 col-sm-6">
                        <input
                          class="from-control"
                          type="text"
                          id="subject"
                          name="subject"
                          placeholder="Subject"
                          required=""
                        />
                      </div>

                      <div class="col-lg-12 mb-40">
                        <textarea
                          class="from-control"
                          id="message"
                          name="message"
                          placeholder=" Message"
                          required=""
                        ></textarea>
                      </div>
                    </div>
                    <div class="form-group mb-0">
                      <input
                        class="btn-send"
                        type="submit"
                        value="Submit Now"
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-lg-4 md-mb-50">
                <div class="contact-address-section style2">
                  <div class="contact-info mb-15 md-mb-30">
                    <div class="icon-part">
                      <i class="fa fa-home"></i>
                    </div>
                    <div class="content-part">
                      <h5 class="info-subtitle">Address</h5>
                      <h4 class="info-title">
                        {" "}
                        Jl.Eunike Mawene Kimi, Nabire Tengah, Papua Tengah.
                      </h4>
                    </div>
                  </div>
                  <div class="contact-info mb-15 md-mb-30">
                    <div class="icon-part">
                      <i class="fa fa-envelope-open-o"></i>
                    </div>
                    <div class="content-part">
                      <h5 class="info-subtitle">Email Address</h5>
                      <h4 class="info-title">
                        <Link href="mailto:info@rstheme.com">
                          info@gotravpapua.com
                        </Link>
                      </h4>
                    </div>
                  </div>
                  <div class="contact-info">
                    <div class="icon-part">
                      <i class="fa fa-headphones"></i>
                    </div>
                    <div class="content-part">
                      <h5 class="info-subtitle">Phone Number</h5>
                      <h4 class="info-title">
                        <Link href="tel+6285243800061">+62 852-4380-0061</Link>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
