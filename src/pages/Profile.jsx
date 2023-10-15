import React, { useState } from "react";
import { useEffect } from "react";
import { getAuth } from "../firebase.config";

function Profile() {
  const auth = getAuth;

  const [user, setUser] = useState();

  useEffect(() => {
    console.log(auth.currentUser);
  }, []);

  return <div>Profile</div>;
}

export default Profile;
