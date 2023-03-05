import React from "react";
import PropTypes from "prop-types";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  const pages = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, i) => currentPage + i - 2
  ).filter((page) => page >= 1 && page <= totalPages);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item${prevPage ? "" : " disabled"}`}>
          <button className="page-link" onClick={() => prevPage && onPageChange(prevPage)} tabIndex="-1">
            Previous
          </button>
        </li>
        {pages.map((page) => (
          <li key={page} className={`page-item${currentPage === page ? " active" : ""}`}>
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
        <li className={`page-item${nextPage ? "" : " disabled"}`}>
          <button className="page-link" onClick={() => nextPage && onPageChange(nextPage)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
