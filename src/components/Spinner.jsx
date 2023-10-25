import React from "react";
import Spinner from "../assets/Loading.svg";
import SpinnerLoop from "../assets/InfinityLoop.svg";

function Loading() {
  return (
    <div className="spinner">
      <img className="spinner-image" src={SpinnerLoop} alt="Spinner" />
    </div>
  );
}

export default Loading;
