import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ isHomepage }) => {
  const location = useLocation();

  const currentPath = location.pathname;

  if (isHomepage) {
    return null;
  }
  return (
    <nav className="navbar fixed-top navbar-light navbar-default">
      <div className="menu">
        <ul>
          <li className="nav-item">
            <Link to="/maps/google" className="nav-item">
              <img alt="Google Maps" src="/images/googlemaps.png" className={`nav-logo ${currentPath === "/maps/google" ? "selected" : ""}`} />
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/maps/leaftlet" className="nav-item">
              <img alt="Leaftlet" src="/images/leaflet.png" className={`nav-logo ${currentPath === "/maps/leaftlet" ? "selected" : ""}`} />
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/maps/mapbox" className="nav-item">
              <img alt="Mapbox" src="/images/mapbox.png" className={`nav-logo ${currentPath === "/maps/mapbox" ? "selected" : ""}`} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
