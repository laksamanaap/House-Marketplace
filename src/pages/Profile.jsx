import React, { useState } from "react";
import { useEffect } from "react";
import { getAuth } from "../firebase.config";
import { updateEmail, sendEmailVerification } from "firebase/auth";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAt,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { db } from "../firebase.config";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";
import ListingItem from "../components/ListingItem";
import Spinner from "../components/Spinner";

function Profile() {
  const auth = getAuth;
  const navigate = useNavigate();

  const [changeDetails, setChangeDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const { name, email } = formData;

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        const userListingRef = collection(db, "listings");

        const q = query(
          userListingRef,
          where(
            "userRef",
            "==",
            auth.currentUser.uid,
            orderBy("timestamp", "desc") // Newest listings
          )
        );

        const docSnap = await getDocs(q);

        let listings = [];

        docSnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        // console.log(listings);
        setListings(listings);
      } catch (err) {
        console.log(err);
        toast.error("Could not fetch listings", {
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

    fetchUserListings();
    setLoading(false);
  }, []);

  const onSubmitData = async () => {
    // Update Profile
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        name,
      });
    } catch (err) {
      console.log(err);
      toast.error("Error Updating data!", {
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

  // Try to get what users type in
  const onChangeData = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // On delete user listings
  const onDelete = async (listingId) => {
    if (window.confirm("Are you sure want to delete?")) {
      try {
        await deleteDoc(doc(db, "listings", listingId));
        const updatedtListing = listings.filter(
          (listing) => listing.id !== listingId
        );
        setListings(updatedtListing);
        toast.success("Listings deleted successfully!", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/");
      } catch (err) {
        console.log(err);
        toast.error("Error deleting listings!", {
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
    }
  };

  console.log(listings);

  const dummyPhoneNumber = 6281232345678;

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmitData();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "done" : "change"}
          </p>
        </div>

        <div className="profileCard">
          <form>
            <div className="profileCardItem">
              <label htmlFor="name">
                Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="name"
                className={!changeDetails ? "profileName" : "profileNameActive"}
                disabled={!changeDetails}
                value={name}
                onChange={onChangeData}
              />
            </div>
            <div className="profileCardItem">
              <label htmlFor="email">
                Email <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
                id="email"
                className={
                  !changeDetails ? "profileEmail" : "profileEmailActive"
                }
                disabled={!changeDetails}
                value={email}
                onChange={onChangeData}
              />
            </div>
            <div className="profileCardItem">
              <label htmlFor="phoneNumber">
                Phone Number <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                id="phoneNumber"
                className={
                  !changeDetails ? "profileEmail" : "profileEmailActive"
                }
                disabled={!changeDetails}
                value={dummyPhoneNumber}
              />
            </div>
          </form>
        </div>
        <Link to="/create-listing" className="createListing">
          <img src={homeIcon} alt="HOME" />
          <p>Sell or rent home</p>
          <img src={arrowRight} alt="" />
        </Link>

        <p className="listingText">Your Current Listings</p>
        {loading ? (
          <Spinner />
        ) : (
          listings?.length > 0 && (
            <>
              <ul className="listingsList">
                {listings?.map((listing) => (
                  <ListingItem
                    id={listing.id}
                    key={listing.id}
                    listing={listing.data}
                    onDelete={() => onDelete(listing.id)}
                  />
                ))}
              </ul>
            </>
          )
        )}
      </main>
    </div>
  );
}

export default Profile;
