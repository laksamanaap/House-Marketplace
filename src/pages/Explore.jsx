import React from "react";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import { Link } from "react-router-dom";

function Explore() {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>
      <main>
        {/* Slider */}

        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img
              src={rentCategoryImage}
              alt="rentCategoryImage"
              className="exploreCategoryImg"
            />
            <p className="exploreCategory">Places For Rent</p>
          </Link>
          <Link to="/category/sale">
            <img
              src={sellCategoryImage}
              alt="sellCategoryImage"
              className="exploreCategoryImg"
            />
            <p className="exploreCategory">Places For Sell</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Explore;
