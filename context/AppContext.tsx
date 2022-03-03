import React from "react";

export const AppContext = React.createContext({ test: "" });

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AppContext.Provider value={{ test: "test22" }}>
      {children}
    </AppContext.Provider>
  );
};
