"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../pagination";
import Loading from "./Loading";

export default function SearchPackages({ data }) {
  const [btnClear, setBtnClear] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResults] = useState(data);
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = searchResult.slice(startIndex, endIndex);

  const handleInputChange = (e) => {
    setBtnClear(false);
    const inputValue = e.target.value;
    if (inputValue === "") {
      setBtnClear(false);
      setSearchResults(data);
    }
    setSearchQuery(inputValue);
  };

  const handleButtonFilter = () => {
    setCurrentPage(1);
    if (searchQuery !== "") {
      setBtnClear(true);
      setIsLoading(true);
      const search = data.filter((item) =>
        JSON.stringify(item.title)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setSearchResults(search);
      handleInputChange;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  });

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
        totalPages={Math.ceil(searchResult.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    );
  };

  const handleClearBtn = () => {
    setSearchQuery("");
    setSearchResults(data);
    setBtnClear(false);
  };

  const RenderButton = () => {
    if (btnClear == true) {
      return (
        <div class="col-md-2">
          <button
            class="btn btn-lg btn-light link-success fw-bold rounded-0 p-3 px-5"
            onClick={handleClearBtn}
          >
            <i class="fa-solid fa-close"></i> Clear
          </button>
        </div>
      );
    }
    return (
      <div class="col-md-2">
        <button
          class="btn btn-lg btn-light link-success fw-bold rounded-0 p-3 px-5"
          onClick={handleButtonFilter}
        >
          <i class="fa-solid fa-search"></i> Search
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
                placeholder="Search"
                type="text"
                name="search"
                value={searchQuery}
                onChange={handleInputChange}
                className="form-control form-control-lg rounded-0 p-3 px-5 text-secondary"
              />
            </div>
            <RenderButton />
          </div>
        </div>
      </div>
      <div
        id="tour-packages"
        className="rs-popular-courses main-home event-bg pt-100 pb-100 md-pt-70 md-pb-70"
      >
        <div className="container py-5">
          <div className="row">
            {isLoading == true ? (
              <>
                <Loading />
                <Loading />
                <Loading />
              </>
            ) : (
              currentPageData.map((item, index) => {
                return (
                  <div className="col-lg-4 col-md-6 mb-24" key={index}>
                    <div className="courses-item">
                      <div className="courses-grid">
                        <div className="img-part">
                          <Link href={`tour-packages/${item.slug}`}>
                            <Image
                              src={
                                process.env.NEXT_PUBLIC_HOSTNAME + item.picture
                              }
                              className="w-100"
                              alt=""
                              width={500}
                              height={500}
                              loading="lazy"
                            />
                          </Link>
                        </div>
                        <div className="content-part">
                          <h3 className="title">
                            <Link href={`tour-packages/${item.slug}`}>
                              {item.title}
                            </Link>
                          </h3>
                          <ul className="flex justify-between">
                            <li>
                              <i className="fa fa-calendar-check-o"></i> 5 Days
                            </li>
                            <li>
                              <i className="fa fa-map-marker"></i> Nabire
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {isLoading == true ? "" : <DataNotFound />}
          </div>
        </div>
      </div>
    </>
  );
}
