import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../assets//svg/deleteIcon.svg";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathIcon from "../assets/svg/bathtubIcon.svg";

import React from "react";

function ListingItem({ listing, id, onDelete }) {
  //   console.log(listing.imageUrls[0]);
  return (
    <li className="categoryListing">
      <Link
        to={`category/${listing.type}/${id}`}
        className="categoryListingLink"
      >
        <img
          src={
            listing.imageUrls?.length
              ? listing?.imageUrls[0]
              : listing?.imgUrls[0]
          }
          alt={listing.name}
          className="categoryListingImg"
        />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingName">{listing.name}</p>
          <p className="categoryListingPrice">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="bed" />
            <p className="categoryListingInfoText">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : "1 Bedroom"}
            </p>
            <img src={bathIcon} alt="bed" />
            <p className="categoryListingInfoText">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : "1 Bathroom"}
            </p>
          </div>
        </div>

        {onDelete && (
          <DeleteIcon
            className="removeIcon"
            fill="red"
            onClick={() => {
              onDelete(listing.id, listing.name);
            }}
          />
        )}
      </Link>
    </li>
  );
}

export default ListingItem;
