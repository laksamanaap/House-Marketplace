import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/swiper-bundle.css";

import BlurPlaceholderImage from "../assets/jpg/placeholder.png";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc, collectionGroup } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import shareIcon from "../assets/svg/shareIcon.svg";

SwiperCore.use([Navigation, Pagination, EffectFade]);

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      // Get listing by the params
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [navigate, params.listingId]);

  // console.log(listing?.imgUrls);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <main>
        {listing?.imgUrls?.length > 0 ? (
          <Swiper
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[EffectFade, Navigation, Pagination]}
            effect={"fade"}
            navigation={true}
          >
            {listing?.imgUrls?.map((url, index) => (
              <SwiperSlide key={index}>
                <img
                  className="swiperSlideDiv"
                  alt={`image-${url}-${index}`}
                  src={url}
                ></img>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <img
            src={BlurPlaceholderImage}
            className="swiperSlideDiv"
            alt="placeholderImg"
          ></img>
        )}

        <div
          className="shareIconDiv"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setShareLinkCopied(true);
            setTimeout(() => {
              setShareLinkCopied(false);
            }, 2500);
          }}
        >
          <img src={shareIcon} alt="Share Icon" />
        </div>

        {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}

        <div className="listingDetails">
          <p className="listingName">
            {listing?.name} - $&nbsp;
            {listing?.offer
              ? listing?.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing?.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
          <p className="listingLocation">{listing?.location}</p>
          <p className="listingType">
            For {listing?.type === "rent" ? "Rent" : "Sale"}
          </p>
          {listing?.offer && (
            <p className="discountPrice">
              ${listing?.regularPrice - listing?.discountedPrice}&nbsp; Discount
            </p>
          )}

          <ul className="listingDetailsList">
            <li>
              {listing?.bedrooms > 1
                ? `${listing?.bedrooms} Bedrooms`
                : "1 Bedroom"}
            </li>
            <li>
              {listing?.bathrooms > 1
                ? `${listing?.bathrooms} Bathrooms`
                : "1 Bathrooms"}
            </li>
            <li>{listing?.parking && "Parking Spot"}</li>
            <li>{listing?.furnished && "Furnished"}</li>
          </ul>

          <p className="listingLocationTitle">Location</p>
          <div className="leafletContainer">
            {listing && listing.latitude && listing.longitude ? (
              <MapContainer
                center={[listing.latitude, listing.longitude]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[listing.latitude, listing.longitude]}>
                  <Popup>{listing.location}</Popup>
                </Marker>
              </MapContainer>
            ) : (
              <p>Location information is not available for this listing.</p>
            )}
          </div>

          {auth.currentUser?.uid !== listing?.userRef && (
            <Link
              to={`/contact/${listing?.userRef}?listingName=${listing?.name}&listingLocation=${listing?.location}`}
              className="primaryButton"
            >
              Contact Landlord
            </Link>
          )}
        </div>
      </main>
    );
  }
}

export default Listing;
