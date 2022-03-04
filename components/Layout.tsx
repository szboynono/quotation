import React, { useContext } from "react";
import Navigation from "./Navigation";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {  
  return (
    <>
      <Navigation></Navigation>
      <div className="px-10">{children}</div>
    </>
  );
};

export default Layout;
