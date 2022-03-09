import React, { useContext } from "react";
import Navigation from "./Navigation";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {  
  return (
    <>
      <Navigation></Navigation>
      <div className="md:px-10 px-4">{children}</div>
    </>
  );
};

export default Layout;
