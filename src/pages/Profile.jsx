import React, { useState } from "react";
import { useEffect } from "react";
import { getAuth, updateProfile } from "../firebase.config";
import { updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";

function Profile() {
  const auth = getAuth;
  const navigate = useNavigate();

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

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>
    </div>
  );
}

export default Profile;
