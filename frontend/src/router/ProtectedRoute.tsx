import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const isLoggedIn = !!localStorage.getItem("user");

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
