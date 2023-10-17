import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

const PrivateRoute = () => {
  const { isLoggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
