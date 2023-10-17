import React from "react";
import Spinner from "../assets/Loading.svg";

function Loading() {
  return (
    <div className="flex justify-center w-100 mt-20">
      <img src={Spinner} alt="Spinner" width={150} />
    </div>
  );
}

export default Loading;
