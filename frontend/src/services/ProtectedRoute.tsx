import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, token } = useAuth();

  useEffect(() => {}, [user]);

  if (!user || !token) return <Navigate to={"/signin"} />;

  return <Outlet />;
};
export default ProtectedRoute;
