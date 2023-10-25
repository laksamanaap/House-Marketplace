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
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState(null);

  const params = useParams();
  console.log("Categories : ", params.categoryName);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        // get listing from firebase
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(3)
        );

        // execute query
        const querySnap = await getDocs(q);

        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetched(lastVisible);
        // console.log(querySnap.docs.length - 1);

        const listings = [];

        querySnap.forEach((listing) => {
          console.log(listing.data());
          //   console.log(listing);
          return listings.push({
            id: listing.id,
            data: listing.data(),
          });
        });

        // console.log(listings);

        setListings(listings);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        toast.error("An errror occured, Category not found", {
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
  }, [params.categoryName]);

  // Load more Pagination
  const fetchLastListing = async () => {
    try {
      // get listing from firebase
      const listingsRef = collection(db, "listings");
      const q = query(
        listingsRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        limit(3),
        startAfter(lastFetched)
      );

      // execute query
      const querySnap = await getDocs(q);

      // pagination
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetched(lastVisible);
      // console.log(querySnap.docs.length - 1);

      const listings = [];

      querySnap.forEach((listing) => {
        console.log(listing.data());
        //   console.log(listing);
        return listings.push({
          id: listing.id,
          data: listing.data(),
        });
      });

      // console.log(listings);

      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      toast.error("An errror occured, Category not found", {
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

  return (
    <div className="category">
      <header>
        <div className="pageHeader">
          <span>"{listings?.length}" </span>
          <span>
            {params.categoryName === "rent"
              ? "Places for Rent"
              : "Places for Sell"}
          </span>
        </div>
      </header>

      <main>
        {loading ? (
          <Spinner />
        ) : listings && listings.length > 0 ? (
          <></>
        ) : (
          <h4>There's no listing found!</h4>
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
      <br />
      {lastFetched && (
        <p className="loadMore" onClick={fetchLastListing}>
          Load More
        </p>
      )}
    </div>
  );
}

export default Category;
