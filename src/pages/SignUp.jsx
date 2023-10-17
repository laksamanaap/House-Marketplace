import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilyIcon from "../assets/svg/visibilityIcon.svg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getAuth } from "../firebase.config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import OAuth from "../components/OAuth";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const [err, setError] = useState(false);

  const navigate = useNavigate();

  const OnChangeData = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const SignUp = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (err) {
      console.error(err);
      // setError(err);
      if (password.length < 6) {
        return toast.error("Password must be at least 6 characters", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (name === null || email === null) {
        return toast.error("Name or email cannot be empty!", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Check your email or password correctly!", {
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

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={SignUp}>
            <input
              type="text"
              placeholder="Name"
              className="nameInput"
              id="name"
              value={name}
              onChange={OnChangeData}
            />

            <input
              type="email"
              placeholder="Email"
              className="emailInput"
              id="email"
              value={email}
              onChange={OnChangeData}
            />

            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                className="passwordInput"
                id="password"
                placeholder="Password"
                value={password}
                onChange={OnChangeData}
              />

              <img
                src={visibilyIcon}
                alt="ShowPassword"
                className="showPassword"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>
            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password
            </Link>

            <div className="signUpBar">
              <p className="signUpText"> Sign Up </p>
              <button className="signInButton">
                <ArrowRightIcon fill="#ffffff" width={34} height={34} />
              </button>
            </div>
          </form>

          <OAuth />

          <Link to={"/sign-in"} className="registerLink">
            Have an account?, Sign In Here
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignIn;
