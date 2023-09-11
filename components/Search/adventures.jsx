"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SearchAdventures({ data }) {
  const [btnClick, setBtnClick] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResults] = useState(data);

  const handleSearch = () => {
    const search = data.filter((item) =>
      JSON.stringify(item.title)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setSearchResults(search);
    setBtnClick(true);
    if (searchQuery === "") {
      setBtnClick(false);
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setSearchResults(data);
    setBtnClick(false);
  };

  const HandleButton = () => {
    if (btnClick == false) {
      return (
        <div className="col-md-2">
          <button
            className="btn btn-lg btn-light link-success fw-bold rounded-0 p-3 px-5"
            onClick={handleSearch}
          >
            <i className="fa-solid fa-search"></i> Search
          </button>
        </div>
      );
    }
    return (
      <div className="col-md-2">
        <button
          className="btn btn-lg btn-light link-success fw-bold rounded-0 p-3 px-5"
          onClick={handleReset}
        >
          <i className="fa-solid fa-searc"></i> Clear
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="bg-success d-flex justify-content-center py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <input
                type="text"
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control form-control-lg rounded-0 p-3 px-5 text-secondary"
              />
            </div>
            <HandleButton />
          </div>
        </div>
      </div>
      <div className="rs-gallery pt-100 pb-100 md-pt-70 md-pb-70">
        <div className="container">
          <div className="row">
            {searchResult.map((item, index) => {
              if (item.status === "Publish") {
                return (
                  <div className="col-lg-4 mb-30 col-md-6" key={index}>
                    <div className="gallery-item">
                      <div className="gallery-Image">
                        <Link
                          className="image-popup"
                          href={`tour-adventures/${item.slug}`}
                        >
                          <Image
                            className="h-72"
                            src={
                              process.env.NEXT_PUBLIC_HOSTNAME + item.picture
                            }
                            alt=""
                            height={1000}
                            width={1000}
                            loading="lazy"
                          />
                        </Link>
                      </div>
                      <div className="title fs-2 fw-bold text-success">
                        Motorcycle Tours
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="container d-flex justify-content-center">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <Link className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
