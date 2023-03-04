import React, { useState } from "react";
import { Link } from "react-router-dom";

function TopBar({ tabs, selectedTab, onTabChange, onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchText);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        Movie App
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          {tabs.map((tab) => (
            <li className="nav-item" key={tab.id}>
              <Link
                to={`movie/${tab.id}`}
                className={`nav-link ${selectedTab === tab.id ? "active" : ""
                  }`}
                onClick={() => onTabChange(tab.id)}
              >
                {tab.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default TopBar;