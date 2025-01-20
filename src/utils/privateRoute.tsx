import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const token = localStorage.getItem("accessToken");

  if (token === null) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default React.memo(PrivateRoute);
