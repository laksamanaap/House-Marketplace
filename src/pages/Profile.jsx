import React, { useState } from "react";
import { useEffect } from "react";
import { getAuth } from "../firebase.config";
import { updateDoc, doc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { db } from "../firebase.config";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";

function Profile() {
  const auth = getAuth;
  const navigate = useNavigate();

  const [changeDetails, setChangeDetails] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const onLogout = () => {
    console.log("logouted!");
    auth.signOut();

    navigate("/");
  };

  const { name, email } = formData;

  const onSubmitData = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
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

  const onChangeData = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

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
      </main>
    </div>
  );
}

export default Profile;
