import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("J&CToken");

  if (token !== null) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
