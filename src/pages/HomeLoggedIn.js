import React, { useEffect } from "react";
import { auth } from "../firebase";

function HomeLoggedIn() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>WELCOME</h1>
    </div>
  );
}

export default HomeLoggedIn;
