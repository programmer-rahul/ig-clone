import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { user, token } = useAuth();

  if (user && token) return <Navigate to={"/"} />;

  return <Outlet />;
};
export default PublicRoute;
