import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-[var(--bg-color)] text-black md:ml-0 ">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
