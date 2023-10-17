import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import googleIcon from "../assets/svg/googleIcon.svg";
import githubIcon from "../assets/svg/githubIcon.svg";
import facebookIcon from "../assets/svg/facebookIcon.svg";

function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Checking User
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      // If the user doesn't exist create an new user
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error("Error signing in with Google!", {
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

  const onFacebookClick = async () => {
    toast.error("Error signing in with Facebook!", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const onGithubClick = async () => {
    toast.error("Error signing in with Github!", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === "/sign-up" ? "up" : "in"} with</p>
      <div className="socialLoginWrapper">
        <button className="socialIconDiv" onClick={onGoogleClick}>
          <img src={googleIcon} alt="Google Icon" width={20} />
        </button>
        <button className="socialIconDiv" onClick={onFacebookClick}>
          <img src={facebookIcon} alt="Google Icon" width={30} />
        </button>
        <button className="socialIconDiv" onClick={onGithubClick}>
          <img src={githubIcon} alt="Google Icon" width={30} />
        </button>
      </div>
    </div>
  );
}

export default OAuth;
