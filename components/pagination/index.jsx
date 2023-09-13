import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pagesToShow = 3;
  const pageNumbers = [];
  for (
    let i = Math.max(currentPage - pagesToShow, 1);
    i <= Math.min(currentPage + pagesToShow, totalPages);
    i++
  ) {
    pageNumbers.push(i);
  }
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };
  return (
    <>
      <div className="container d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              {currentPage > 1 && (
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              )}
            </li>
            {pageNumbers.map((page, index) => (
              <li className="page-item" key={index}>
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`page-link${
                    currentPage === page ? "active page-link" : ""
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}
            <li className="page-item">
              {currentPage < totalPages && (
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
