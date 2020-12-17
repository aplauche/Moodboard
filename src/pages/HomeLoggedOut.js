import React, { useEffect, useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import styled from "@emotion/styled";
import { current } from "immer";
import ForgotPassword from "../components/forgotPassword";

function HomeLoggedOut() {
  const [currentModal, setCurrentModal] = useState("register");

  const handleToggle = (modal) => {
    setCurrentModal(modal);
  };

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
        {currentModal == "login" && <Login handleToggle={handleToggle} />}
        {currentModal == "register" && <Register handleToggle={handleToggle} />}
        {currentModal == "forgot" && (
          <ForgotPassword handleToggle={handleToggle} />
        )}
      </div>
    </>
  );
}

export default HomeLoggedOut;
