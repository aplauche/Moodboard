import React, { useEffect, useContext } from "react";
import styled from "@emotion/styled";
import Button from "@material-ui/core/Button";
import { auth } from "../firebase";
import { NavLink, Link } from "react-router-dom";
import { Context } from "../store";

const HeaderDiv = styled("header")`
  width: 100%;
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #212529;

  & .logo {
    font-weight: 700;
    font-size: 32px;
    color: #b2c3ff;
    text-decoration: none;
    font-family: "Damion", cursive;
  }

  & .nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  & .nav a {
    display: block;
    padding: 0px 40px;
    color: white;
    text-decoration: none;
  }
`;

function Header() {
  const { appState, appDispatch } = useContext(Context);

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <HeaderDiv>
      <Link to="/" className="logo">
        Moodz
      </Link>
      <div className="nav">
        {!appState.user ? (
          <></>
        ) : (
          <>
            <NavLink to="/explore">Explore</NavLink>

            <NavLink to="/boards">My Boards</NavLink>
            <NavLink to={`/profile/${appState.user.uid}`}>My Profile</NavLink>
            <Button style={{ color: "white" }} onClick={handleSignOut}>
              Sign Out
            </Button>
          </>
        )}
      </div>
    </HeaderDiv>
  );
}

export default Header;
