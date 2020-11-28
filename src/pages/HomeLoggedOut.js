import React, { useEffect } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import styled from "@emotion/styled";

function HomeLoggedOut() {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: "10vh",
        }}
      >
        <Login />
        <Register />
      </div>
    </>
  );
}

export default HomeLoggedOut;
