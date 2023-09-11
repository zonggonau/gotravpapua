"use client";
import React, { useState } from "react";

export default function Search() {
  const [filter, setFilter] = useState("");
  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  return (
    <>
      <div className="bg-success d-flex justify-content-center py-5">
        <div className="container">
          <form action="">
            <div className="row">
              <div className="col-md-10">
                <input
                  type="text"
                  name="search"
                  value={filter}
                  onChange={handleChange}
                  className="form-control form-control-lg rounded-0 p-3 px-5 text-secondary"
                />
              </div>
              <div className="col-md-2">
                <button className="btn btn-lg btn-light link-success fw-bold rounded-0 p-3 px-5">
                  <i className="fa-solid fa-search"></i> Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
