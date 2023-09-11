"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Filters() {
  const [isOpenDestination, setIsOpenDestination] = useState(false);
  const [isOpenDuration, setIsOpenDuration] = useState(false);
  const [selectedOption] = useState(null);

  const toggleDropdownDestination = () => {
    setIsOpenDestination(!isOpenDestination);
  };
  const toggleDropdownDuration = () => {
    setIsOpenDuration(!isOpenDuration);
  };

  return (
    <>
      <div className="bg-success d-flex justify-content-center py-5">
        <div className="row">
          <div className="col-md-4">
            <div className="destinations">
              <button
                className="btn btn-outline-light btn-lg dropdown-toggle rounded-0"
                type="button"
                onClick={toggleDropdownDestination}
              >
                Destinations
              </button>
              <ul
                className={`dropdown-menu ${
                  isOpenDestination == true ? "show" : ""
                }`}
              >
                <li>
                  <Link className="dropdown-item" href="#">
                    Raja Ampat
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Nabire
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Jayapura
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-4">
            <div className="duration">
              <button
                className="btn btn-outline-light btn-lg dropdown-toggle rounded-0"
                type="button"
                onClick={toggleDropdownDuration}
              >
                Duration
              </button>
              <ul
                className={`dropdown-menu ${
                  isOpenDuration == true ? "show" : ""
                }`}
              >
                <li>
                  <Link className="dropdown-item" href="#">
                    1 - 2 Days
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    3 - 5 Days
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    1 Week
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Custom
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-4">
            <button className="btn btn-light btn-lg rounded-0 filter-btn">
              <i className="fa-solid fa-search"></i>
              Filter Packages
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
