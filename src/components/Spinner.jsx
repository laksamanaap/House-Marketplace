import React from "react";
import Spinner from "../assets/Loading.svg";
import SpinnerLoop from "../assets/InfinityLoop.svg";

function Loading() {
  return (
    <div className="flex justify-center w-100 mt-20">
      <img
        className="flex justify-center w-100 mx-auto"
        src={SpinnerLoop}
        alt="Spinner"
      />
    </div>
  );
}

export default Loading;
