import React from "react";
import "./SkeletonMovieCard.css";

function SkeletonMovieCard() {
  return (
    <div className="card h-100">
      <div className="skeleton-image"></div>
      <div className="card-body">
        <div className="skeleton-title"></div>
        <div className="skeleton-date"></div>
      </div>
    </div>
  );
}

export default SkeletonMovieCard;
