import React, { useEffect, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { auth } from "../firebase";
import { Context } from "../store";
import styled from "@emotion/styled";

const LoginModal = styled("div")`
  padding: 40px 40px 20px 40px;
  box-shadow: 2px 4px 18px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: white;
  margin: 30px;

  & h2 {
    display: block;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  & p {
    color: #666;
    display: block;
    margin: 20px 0px;
    text-align: center;
  }

  & .alt-link {
    display: block;
    cursor: pointer;

    color: #8ec5fc;
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
    width: 100%;
  }
`;

function ForgotPassword({ handleToggle }) {
  const [email, setEmail] = useState("");
  const [sentMessage, setSentMessage] = useState("");
  const [sent, setSent] = useState(false);

  const { appState, appDispatch } = useContext(Context);

  // sign up through firebase
  const resetPassword = (event) => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setSent(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <LoginModal>
        <h2>Reset Password</h2>
        {sent ? (
          <p>An email with a reset link has been sent.</p>
        ) : (
          <StyledForm>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={resetPassword}>Send Email</Button>
          </StyledForm>
        )}

        <p>
          Return to Login
          <span
            className="alt-link"
            onClick={() => {
              handleToggle("login");
            }}
          >
            Login
          </span>
        </p>
      </LoginModal>
    </>
  );
}

export default ForgotPassword;
