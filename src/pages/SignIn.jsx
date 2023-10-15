import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilyIcon from "../assets/svg/visibilityIcon.svg";
import { getAuth } from "../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [err, setError] = useState(false);
  const { email, password } = formData;
  const navigate = useNavigate();

  const OnChangeData = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitData = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth;
      // console.log(auth);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(userCredential);
      if (userCredential.user) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Try to check your email or password!", {
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
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={onSubmitData}>
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
            {err && (
              <p style={{ color: "#ff0000", marginTop: "unset" }}>
                Please ensure that you've entered the correct email and
                password!
              </p>
            )}
            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password
            </Link>

            <div className="signInBar">
              <p className="signInText"> Sign In</p>
              <button className="signInButton">
                <ArrowRightIcon fill="#ffffff" width={34} height={34} />
              </button>
            </div>
          </form>

          <Link to={"/sign-up"} className="registerLink">
            Sign Up Here Instead
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignUp;
