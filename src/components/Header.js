import React, { useEffect } from "react";
import styled from "@emotion/styled";
import Button from "@material-ui/core/Button";
import { auth } from "../firebase";

const HeaderDiv = styled("header")`
  width: 100%;
  padding: 20px;
  background: white;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .logo {
    font-weight: 700;
    text-transform: uppercase;
  }

  & .nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  & .nav a {
    display: block;
    padding: 0px 40px;
  }
`;

function Header() {
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <HeaderDiv>
      <div className="logo">MOODBOARD</div>
      <div className="nav">
        <a href="">Explore</a>
        <a href="">Boards</a>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </div>
    </HeaderDiv>
  );
}

export default Header;
