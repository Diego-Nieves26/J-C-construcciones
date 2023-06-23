import { createContext, useEffect, useState } from "react";
import { instance } from "../axios/axiosConfig";
import { getConfig } from "../axios/getHeaders";
// --------------------------------------------------------------------

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userCredentials, setUserCredentials] = useState({});

  // VERIFY SESSION USER
  useEffect(() => {
    if (localStorage.getItem("J&CToken")) {
      instance
        .get("/users/check-token", getConfig())
        .then(({ data }) => setUserCredentials(data.user))
        .catch(() => localStorage.removeItem("J&CToken"));
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        userCredentials,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
