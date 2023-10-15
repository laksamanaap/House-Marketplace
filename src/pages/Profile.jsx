import React, { useState } from "react";
import { useEffect } from "react";
import { getAuth } from "../firebase.config";

function Profile() {
  const auth = getAuth;

  const [user, setUser] = useState([]);

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  return <div>{user ? <h1>{user.displayName}</h1> : "not logged in"}</div>;
}

export default Profile;
