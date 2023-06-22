import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

// --------------------------------------------------------------------

import { Loader } from "./components";
import { DataProvider } from "./context/dataContext";
import { routes } from "./routes/AllRoutes.jsx";

// CSS
import "react-toastify/dist/ReactToastify.css";
import "./main.css";

// --------------------------------------------------------------------

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataProvider>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={routes} />
      </Suspense>
    </DataProvider>
  </React.StrictMode>
);
