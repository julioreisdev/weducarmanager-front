import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const context = useContext(AuthContext);
  return context?.isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
