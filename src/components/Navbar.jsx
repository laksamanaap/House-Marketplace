import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonIcon } from "../assets/svg/personOutlineIcon.svg";
import React from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoutes = (route) => {
    if (route === location.pathname) {
      return true;
    } else {
      // console.error("Path Not Matched!");
      return false;
    }
  };

  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem" onClick={() => navigate("/")}>
            <ExploreIcon
              fill={pathMatchRoutes("/") ? "#ff0000" : "#2c2c2c"}
              width={36}
              height={36}
            />
            <p
              className={
                pathMatchRoutes("/")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Explore
            </p>
          </li>
          <li className="navbarListItem" onClick={() => navigate("/offers")}>
            <OfferIcon
              fill={pathMatchRoutes("/offers") ? "#ff0000" : "#2c2c2c"}
              width={36}
              height={36}
            />
            <p
              className={
                pathMatchRoutes("/offers")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Offer
            </p>
          </li>
          <li className="navbarListItem" onClick={() => navigate("/profile")}>
            <PersonIcon
              fill={pathMatchRoutes("/profile") ? "#ff0000" : "#2c2c2c"}
              width={36}
              height={36}
            />
            <p
              className={
                pathMatchRoutes("/profile")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
