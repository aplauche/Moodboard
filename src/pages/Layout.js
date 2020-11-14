import React, { useEffect } from "react";
import Header from "../components/Header";

function Layout({ children }) {
  return (
    <>
      <Header></Header>
      <div
        className="main"
        style={{ margin: "0 auto", width: "90%", padding: "50px 20px" }}
      >
        {children}
      </div>
    </>
  );
}

export default Layout;
