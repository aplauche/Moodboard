import React, { useEffect, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { auth } from "../firebase";
import { Context } from "../store";
import styled from "@emotion/styled";

const LoginModal = styled("div")`
  padding: 40px;
  box-shadow: 2px 4px 18px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: white;
  margin: 30px;

  & h2 {
    display: block;
    text-align: center;
    margin-bottom: 10px;
  }
`;

const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
  align-items: center;

  & input {
    margin-bottom: 8px;
  }

  & button {
    margin-top: 16px;
  }
`;

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // sign up through firebase
  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <LoginModal>
        <h2>Register</h2>
        <StyledForm>
          <Input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={signUp}>Sign Up</Button>
        </StyledForm>
      </LoginModal>
    </>
  );
}

export default Register;
