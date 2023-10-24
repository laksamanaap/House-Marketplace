import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth();

  const onChangeData = (e) => {
    setEmail(e.target.value);
  };

  const onSubmitData = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Email sent", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err.message);
      toast.success(`${err.message}`, {
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
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmitData}>
          <input
            type="email"
            className="emailInput"
            placeholder="Account Current Email"
            value={email}
            onChange={onChangeData}
          />
          <Link className="forgotPasswordLink" to={"/sign-in"}>
            Sign In
          </Link>

          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton">
              <ArrowRightIcon
                fill="#ffffff"
                width="34px"
                height="34px"
              ></ArrowRightIcon>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ForgotPassword;
