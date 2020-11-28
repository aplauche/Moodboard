import React, { useEffect } from "react";
import Header from "../components/Header";

function Layout({ children, isHome }) {
  if (isHome) {
    return (
      <>
        <Header></Header>
        <div
          className="main"
          style={{
            width: "100%",
            minHeight: "90vh",
            backgroundImage: "url('/moodboard-home-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          {children}
        </div>
      </>
    );
  }

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
