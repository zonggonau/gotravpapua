"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../pagination";

export default function SearchEvents({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResults] = useState(data);
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = searchResult.slice(startIndex, endIndex);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);
    const search = data.filter((item) =>
      JSON.stringify(item.title)
        .toLowerCase()
        .includes(inputValue.toLowerCase())
    );
    setSearchResults(search);

    if (searchQuery === "") {
      setSearchResults(search);
    }
  };

  const DataNotFound = () => {
    if (searchResult.length <= 0) {
      return (
        <>
          <p className="bg-stone-400 text-xl p-2">Data Not Found !</p>
        </>
      );
    }
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    );
  };

  return (
    <>
      <div className="bg-success d-flex justify-content-center py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <input
                placeholder="Search"
                type="text"
                name="search"
                value={searchQuery}
                onChange={handleInputChange}
                className="form-control form-control-lg rounded-0 p-3 px-5 text-secondary"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        id="rs-blog"
        className="rs-blog orange-color style1 modify1 pt-85 pb-100 md-pt-70 md-pb-70"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 pr-60 md-pr-15 md-mb-30 mb-0">
              {currentPageData.map((item, index) => {
                if (item.status === "Publish") {
                  return (
                    <div
                      className="mb-4"
                      style={{
                        borderBottomStyle: "dotted",
                        borderBottomColor: "#ccc",
                      }}
                      key={index}
                    >
                      <div className="row no-gutter white-bg blog-item border-0">
                        <div className="col-md-4">
                          <div className="image-part">
                            <Link href={`tour-events/${item.slug}`}>
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_HOSTNAME +
                                  item.picture
                                }
                                className="w-100"
                                alt=""
                                width={500}
                                height={500}
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="blog-content">
                            <ul className="blog-meta">
                              <li>
                                <small className="border p-2 px-3">
                                  <i className="fa-solid fa-calendar-check-o"></i>{" "}
                                  8 Aug 2023 - 10 Aug 2023
                                </small>
                              </li>
                            </ul>
                            <h3 className="title">
                              <Link href={`tour-events/${item.slug}`}>
                                {item.title}
                              </Link>
                            </h3>
                            <p className="m-0">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Est debitis similique cum esse iusto,
                              adipisci ab odit sunt totam sequi.
                            </p>
                            <ul className="blog-meta mt-3">
                              <li>
                                <Link href="" className="btn p-0">
                                  <i className="fa-solid fa-tag"></i> Cultural
                                </Link>
                              </li>
                              <li>
                                <Link href="" className="btn p-0">
                                  <i className="fa-solid fa-map-marker"></i>{" "}
                                  Wamena
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              <DataNotFound />
            </div>

            <div className="col-lg-4 pr-60 md-pr-15 md-mb-30">
              <div className="bg-info p-4 text-light">
                <h3 className="text-light">Lorem ipsum dolor sit amet.</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Quia, sed, ducimus culpa voluptatum, consectetur natus cum
                  tenetur dignissimos explicabo obcaecati iusto delectus saepe
                  sequi quod.
                </p>
                <button className="btn btn-lg btn-light link-info rounded-0 w-100 fw-bold">
                  <i className="fa-solid fa-paper-plane"></i> Join Now!
                </button>
              </div>
              <div className="p-4" style={{ backgroundColor: "azure" }}>
                <p className="p-0">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Quasi aliquam magni quos, impedit quibusdam sequi
                  necessitatibus optio cum beatae ducimus molestiae, aperiam
                  voluptatum nemo qui!
                </p>
              </div>
              <div className="border mt-3 p-4">
                <p className="p-0">
                  Lorem, amet consectetur adipisicing elit. ipsum dolor sit amet
                  consectetur adipisicing elit.{" "}
                </p>
              </div>
              <div className="border mt-3 p-4">
                <p className="p-0">
                  Lorem, amet consectetur adipisicing elit. ipsum dolor sit amet
                  consectetur adipisicing elit.{" "}
                </p>
              </div>
              <div className="border mt-3 p-4">
                <p className="p-0">
                  Lorem, amet consectetur adipisicing elit. ipsum dolor sit amet
                  consectetur adipisicing elit.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
