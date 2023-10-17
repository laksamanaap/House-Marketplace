import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Loading from "./Spinner";

const PrivateRoute = () => {
  const { isLoggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Loading />;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
