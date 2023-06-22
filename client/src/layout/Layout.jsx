import { lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// --------------------------------------------------------------------

import { Drawer } from "../components";
import ProtectedRoutes from "../routes/ProtectedRoutes";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const AccessRequestPage = lazy(() =>
  import("../pages/AccessRequestPage/AccessRequestPage")
);
const ManageAccountsPage = lazy(() =>
  import("../pages/ManageAccountsPage/ManageAccountsPage")
);
const DeleteDataPage = lazy(() =>
  import("../pages/DeleteDataPage/DeleteDataPage")
);
const AddDataPage = lazy(() => import("../pages/AddDataPage/AddDataPage"));
const OrganizerPage = lazy(() =>
  import("../pages/OrganizerPage/OrganizerPage")
);

// --------------------------------------------------------------------

export default function Layout() {
  const location = useLocation().pathname;

  return (
    <div
      className={`${
        location !== "/login" && location !== "/register"
          ? "page-container"
          : ""
      }`}
    >
      {location !== "/login" && location !== "/register" && <Drawer />}
      <ToastContainer />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/access-request" element={<AccessRequestPage />} />
          <Route path="/manage-accounts" element={<ManageAccountsPage />} />
          <Route path="/delete-data/:type" element={<DeleteDataPage />} />
          <Route path="/add-data/:type" element={<AddDataPage />} />
          <Route path="/organizer" element={<OrganizerPage />} />
        </Route>
      </Routes>
    </div>
  );
}
