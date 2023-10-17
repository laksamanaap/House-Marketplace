import React from "react";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        console.error("An error occured when fetch user data");
      }
      setCheckingStatus(false);
    });
  }, []);

  return { isLoggedIn, checkingStatus };
};

export default useAuthStatus;

// https://stackoverflow.com/questions/65505665/protected-route-with-firebase
