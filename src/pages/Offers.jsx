import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAt,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        // get listing from firebase
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        // execute query
        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((listing) => {
          // console.log(listing.data());
          //   console.log(listing);
          return listings.push({
            id: listing.id,
            data: listing.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        toast.error("An errror occured, Offers not found", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    };

    fetchListing();
  }, []);

  return (
    <div className="category">
      <header>
        <div className="pageHeader">Offers</div>
      </header>
      <main>
        {loading ? (
          <Spinner />
        ) : listings && listings.length > 0 ? (
          <></>
        ) : (
          <h4>There's no offers found!</h4>
        )}
        <ul className="categoryListings">
          {listings?.map((listing) => (
            <ListingItem
              listing={listing.data}
              id={listing.id}
              key={listing.id}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Offers;
