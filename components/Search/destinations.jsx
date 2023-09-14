"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../pagination";

export default function SearchDestination({ data }) {
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
            {currentPageData.map((item, index) => {
              if (item.status === "Publish") {
                return (
                  <div className="col-lg-6 pr-60 md-pr-15 md-mb-30" key={index}>
                    <div className="row no-gutter white-bg blog-item mb-35">
                      <div className="col-md-6">
                        <div className="image-part h-100">
                          <Link href={`tour-destinations/${item.slug}`}>
                            <Image
                              src={
                                process.env.NEXT_PUBLIC_HOSTNAME + item.picture
                              }
                              className="w-100"
                              alt=""
                              width={500}
                              height={500}
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="blog-content">
                          <h3 className="title">
                            <Link href="blog-single.html">{item.title}</Link>
                          </h3>
                          <ul className="blog-meta">
                            <li>
                              <i className="fa-solid fa-map-marker"></i> Nabire
                            </li>
                          </ul>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
            <DataNotFound />
          </div>
        </div>
      </div>
    </>
  );
}
