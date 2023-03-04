import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  // Add current page and nearby pages to the array
  for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
    pages.push(i);
  }

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

export default Pagination;