import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return localStorage.getItem("authorization") ? (
    <>{children}</>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
