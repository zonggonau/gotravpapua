"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "react-loading-skeleton/dist/skeleton.css";
import Pagination from "../pagination";
import Loading from "./Loading";
import RightBar from "@/config/rightbar/rightbar";

export default function SearchEvents({ data }) {
  const [btnClear, setBtnClear] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResults] = useState(data);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = searchResult.slice(startIndex, endIndex);
  const shortedData = currentPageData.sort((a, b) => b.id - a.id);

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
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, [shortedData]);

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
        <div class="col-md-4">
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
            <div className="col-md-8">
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
        id="rs-blog"
        className="rs-blog orange-color style1 modify1 pt-85 pb-100 md-pt-70 md-pb-70"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 pr-60 md-pr-15 md-mb-30 mb-0">
              {isLoading == true ? (
                <>
                  <Loading />
                  <Loading />
                  <Loading />
                </>
              ) : (
                shortedData.map((item, index) => {
                  return (
                    <div
                      className="mb-4 border-1"
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
                            {/* <ul className="blog-meta mt-3">
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
                            </ul> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              {isLoading == true ? "" : <DataNotFound />}
            </div>
            <RightBar />
          </div>
        </div>
      </div>
    </>
  );
}
