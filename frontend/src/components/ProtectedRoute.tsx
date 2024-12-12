import { Navigate, Outlet } from "react-router-dom";

 const ProtectedRoute = () => {
  const isAuthenticated = window.localStorage.getItem("jwt");

  if (isAuthenticated === null) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
