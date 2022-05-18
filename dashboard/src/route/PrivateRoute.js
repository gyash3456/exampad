import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
  const { isLoggedIn } = useSelector((state) => state.user);
  if (!isLoggedIn) {
    return <Navigate to={`${process.env.PUBLIC_URL}/auth-login`} />;
  }

  return children;
}

export default PrivateRoute;
