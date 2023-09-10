"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { dataCarouselHero } from "@/data";

export const metadata = {
  title: "GoTravPapua Tour Contact",
  description:
    "Contact Us for Seamless Tour Planning and Unforgettable Experiences. Your Adventure Awaits!",
};

export default function Contact() {
  const [notification, setNotification] = useState("");
  const [kontak, setKontak] = useState({
    name: "",
    message: "",
    // subject: "",
    // phone: "",
    // email: "",
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    setKontak((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_HOST_API + "messages/store",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(kontak),
        }
      );

      if (response.ok) {
        setNotification("Pesan berhasil terkirim!");

        // Reset formulir
        setKontak({
          name: "",
          // email: "",
          // phone: "",
          // subject: "",
          message: "",
        });
      } else {
        // Ada kesalahan saat mengirim data
        console.error("Gagal mengirim data");
        setKontak({ kontak });
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <>
      <div className="main-content bg-white">
        <div className="rs-breadcrumbs breadcrumbs-overlay">
          <div className="breadcrumbs-img">
            <Image
              className="h-96"
              src={process.env.NEXT_PUBLIC_HOST + dataCarouselHero[0].imageUrl}
              alt="Breadcrumbs Image"
              height={700}
              width={1000}
            />
          </div>
          <div className="breadcrumbs-text white-color">
            <h1
              className="page-title white-color wow fadeInUp"
              data-wow-delay="300ms"
              data-wow-duration="2000ms"
            >
              Contact
            </h1>
            <div
              className="sec-title mb-40 md-mb-20 wow fadeInUp"
              data-wow-delay="300ms"
              data-wow-duration="2000ms"
            >
              <div className="desc text-center col-md-6 mx-auto">
                Discover the untouched beauty of Papua with our Papuan Paradise
                Expedition, Coastal Retreat, Wildlife Safari, Cultural
                Immersion, Diving Expedition, Highlands Adventure, River
                Expedition, and many more
              </div>
              <ul className="my-3 white-color">
                <li>
                  <Link className="active" href="index.html">
                    Home
                  </Link>
                </li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="contact-page-section orange-color pt-100 pb-100 md-pt-70 md-pb-70">
          <div className="container">
            <div className="row pb-50">
              <div className="col-12">
                <div className="contact-map">
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

            <div className="row align-items-end contact-bg1">
              <div className="col-lg-8 lg-pl-0">
                <div className="rs-quick-contact new-style">
                  <div className="inner-part mb-35">
                    <h2 className="title mb-15">Get In Touch</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      eius to mod tempor incidi dunt ut dolore.
                    </p>
                  </div>
                  <div id="form-messages"></div>
                  {notification && (
                    <div id="form-messages" className="bg-green p-3">
                      {notification}
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6 mb-30 col-md-6 col-sm-6">
                        <input
                          className="from-control"
                          type="text"
                          id="name"
                          name="name"
                          value={kontak.name}
                          onChange={handleChange}
                          placeholder="Name"
                          required
                        />
                      </div>
                      <div className="col-lg-6 mb-30 col-md-6 col-sm-6">
                        <input
                          className="from-control"
                          type="text"
                          id="email"
                          name="email"
                          value={kontak.email}
                          onChange={handleChange}
                          placeholder="Email"
                          required=""
                        />
                      </div>
                      <div className="col-lg-6 mb-30 col-md-6 col-sm-6">
                        <input
                          className="from-control"
                          type="text"
                          id="phone"
                          name="phone"
                          value={kontak.phone}
                          onChange={handleChange}
                          placeholder="Phone"
                          required=""
                        />
                      </div>
                      <div className="col-lg-6 mb-30 col-md-6 col-sm-6">
                        <input
                          className="from-control"
                          type="text"
                          id="subject"
                          name="subject"
                          value={kontak.subject}
                          onChange={handleChange}
                          placeholder="Subject"
                          required=""
                        />
                      </div>

                      <div className="col-lg-12 mb-40">
                        <textarea
                          className="from-control"
                          id="message"
                          value={kontak.message}
                          onChange={handleChange}
                          name="message"
                          placeholder="Message"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="form-group mb-0">
                      <button className="btn-send" type="submit">
                        Submit Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-4 md-mb-50">
                <div className="contact-address-section style2">
                  <div className="contact-info mb-15 md-mb-30">
                    <div className="icon-part">
                      <i className="fa fa-home"></i>
                    </div>
                    <div className="content-part">
                      <h5 className="info-subtitle">Address</h5>
                      <h4 className="info-title">
                        {" "}
                        Jl.Eunike Mawene Kimi, Nabire Tengah, Papua Tengah.
                      </h4>
                    </div>
                  </div>
                  <div className="contact-info mb-15 md-mb-30">
                    <div className="icon-part">
                      <i className="fa fa-envelope-open-o"></i>
                    </div>
                    <div className="content-part">
                      <h5 className="info-subtitle">Email Address</h5>
                      <h4 className="info-title">
                        <Link href="mailto:info@rstheme.com">
                          info@gotravpapua.com
                        </Link>
                      </h4>
                    </div>
                  </div>
                  <div className="contact-info">
                    <div className="icon-part">
                      <i className="fa fa-headphones"></i>
                    </div>
                    <div className="content-part">
                      <h5 className="info-subtitle">Phone Number</h5>
                      <h4 className="info-title">
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
