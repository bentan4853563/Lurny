import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Adjust path as necessary

const ProtectedRoute = () => {
  const isAuth = useAuth();
  if (!isAuth) {
    console.log("Outlet");
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
