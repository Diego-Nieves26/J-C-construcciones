import { createContext } from "react";

// --------------------------------------------------------------------

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const hello = "Hola";

  return (
    <DataContext.Provider
      value={{
        hello,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
