import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isHomepage }) => {
  if (isHomepage) {
    return null;
  }
  return (
    <nav className="navbar fixed-top navbar-light navbar-default">
      <div className="container">
        <div className="menu">
          <ul>
            <li className="nav-item">
              <Link to="/maps/google" className="nav-link">
                Google Maps
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/maps/leaftlet" className="nav-link">
                Leaflet
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/maps/mapbox" className="nav-link">
                Mapbox
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
