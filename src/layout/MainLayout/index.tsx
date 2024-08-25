import React, { ReactNode } from "react";
import NavBar from "../Navbar";
import { useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";
  const isRegisterRoute = location.pathname === "/register";

  return (
    <div>
      {!isLoginRoute && !isRegisterRoute && <NavBar />}
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
