import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function TopBar({ tabs }) {
  const [searchText, setSearchText] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    navigate(`/search/movie?query=${searchText}`);
  };

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        Movie App
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleNavbar}
        aria-controls="navbarNav"
        aria-expanded={!isCollapsed}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`} id="navbarNav">
        <ul className="navbar-nav mr-auto">
          {tabs.map((tab) => (
            <li className="nav-item" key={tab.id}>
              <Link
                to={`movie/${tab.id}`}
                className={`nav-link active`}
              >
                {tab.name}
              </Link>
            </li>
          ))}
        </ul>
        <form className="form-inline ml-auto" onSubmit={handleSearchSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchText}
              onChange={handleSearchTextChange}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="submit">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </nav>
  );
}

export default TopBar;
