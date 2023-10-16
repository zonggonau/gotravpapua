"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Kontak({ data }) {
  const [notificationSuccess, setNotificationSuccess] = useState(false);
  const [notificationFailed, setNotificationFailed] = useState(false);
  const [notificationWarning, setNotificationWarning] = useState(false);
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

  const Notification = () => (
    <ToastContainer position="top-right" autoClose={3000} />
  );

  const RenderMessageSuccess = () =>
    toast.success("Your message has been sent !", {
      position: "top-right",
      autoClose: 3000,
    });
  const RenderMessageFailed = () =>
    toast.info("Your message failed to sent !", {
      position: "top-right",
      autoClose: 3000,
    });

  const RenderMessageNetworkError = () =>
    toast.error("Network Error !", {
      position: "top-right",
      autoClose: 3000,
    });

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
        // Reset formulir
        setNotificationSuccess(true);
        setKontak({
          name: "",
          // email: "",
          // phone: "",
          // subject: "",
          message: "",
        });
      } else {
        // Ada kesalahan saat mengirim data
        // console.error("Gagal mengirim data");
        setNotificationFailed(true);
        setKontak({ kontak });
      }
    } catch (error) {
      // console.error("Terjadi kesalahan:", error);
      setNotificationWarning(true);
    }
  };

  useEffect(() => {
    if (notificationSuccess == true) {
      RenderMessageSuccess();
    }
    if (notificationFailed == true) {
      RenderMessageFailed();
    }
    if (notificationWarning == true) {
      RenderMessageNetworkError();
    }
  }, [notificationSuccess, notificationFailed, notificationWarning]);

  return (
    <>
      <Notification />
      <div className="row align-items-end contact-bg1">
        <div className="col-lg-7 lg-pl-0">
          <div className="rs-quick-contact new-style">
            <div className="inner-part mb-35">
              <h2 className="title mb-15">Get In Touch</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, eius
                to mod tempor incidi dunt ut dolore.
              </p>
            </div>
            <form onSubmit={handleSubmit} method="post">
              <div className="row">
                <div className="col-lg-12 mb-30 ">
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
                {/* <div className="col-lg-6 mb-30 col-md-6 col-sm-6">
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
                </div> */}
                {/* <div className="col-lg-6 mb-30 col-md-6 col-sm-6">
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
                </div> */}
                {/* <div className="col-lg-6 mb-30 col-md-6 col-sm-6">
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
                </div> */}

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
                <button
                  className="btn-send"
                  type="submit"
                  // onClick={RenderMessage}
                >
                  Submit Now
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-5 md-mb-50 text-sm">
          <div className="contact-address-section style2">
            <div className="contact-info mb-15 md-mb-30">
              <div className="icon-part">
                <i className="fa fa-home"></i>
              </div>
              <div className="content-part">
                <h5 className="info-subtitle">Address</h5>
                <h4 className="info-title">{data.office_address}</h4>
              </div>
            </div>
            <div className="contact-info mb-15 md-mb-30">
              <div className="icon-part">
                <i className="fa fa-envelope-open-o"></i>
              </div>
              <div className="content-part">
                <h5 className="info-subtitle">Email Address</h5>
                <h4 className="info-title">
                  <Link href={`mailto:${data.email_address}`}>
                    {data.email_address}
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
                  <Link href={`tel:${data.telephone}`}>{data.telephone}</Link>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
