import React from "react";

function TopBar({ tabs, activeTab, onTabChange }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Movie App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {tabs.map((tab) => (
              <li key={tab.id} className="nav-item">
                <a
                  className={`nav-link ${activeTab === tab.id && "active"}`}
                  href="#"
                  onClick={() => onTabChange(tab.id)}
                >
                  {tab.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default TopBar;