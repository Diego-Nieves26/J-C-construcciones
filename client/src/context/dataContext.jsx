import { createContext, useEffect, useState } from "react";
import { instance } from "../axios/axiosConfig";
// --------------------------------------------------------------------

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userCredentials, setUserCredentials] = useState({});

  // VERIFY SESSION USER
  useEffect(() => {
    instance
      .get("/users/check-token", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("J&CToken")}`,
        },
      })
      .then(({ data }) => setUserCredentials(data.user))
      .catch(() => localStorage.removeItem("J&CToken"));
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
