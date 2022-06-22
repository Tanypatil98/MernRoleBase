import React from "react";
import Navbar from "./Navbar";
import "../../css/component.css";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="Layout">
      <input type="checkbox" id="sidebar_toggel" />
      <main className="main_content">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
