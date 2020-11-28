import React, { useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import PostFormModal from "./PostFormModal";
import { Context } from "../store";

const ToolbarDiv = styled("div")`
  width: 100%;
  box-shadow: 2px 2px 18px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  background: #212529;

  & button {
    margin: 4px;
  }
`;

function Toolbar({ boardName }) {
  const { appState, appDispatch } = useContext(Context);

  return (
    <>
      <PostFormModal />
      <ToolbarDiv>
        <div className="left">
          <p></p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              appDispatch({ type: "openPostFormModal" });
            }}
          >
            Add POST
          </button>
        </div>
        <div className="right">
          <button
            onClick={(e) => {
              appDispatch({ type: "toggleTitles" });
            }}
          >
            {appState.boardViewSettings.showTitles ? "Hide Info" : "Show Info"}
          </button>
          <button
            onClick={(e) => {
              appDispatch({ type: "toggleButtons" });
            }}
          >
            {appState.boardViewSettings.showButtons
              ? "Hide Controls"
              : "Show Controls"}
          </button>
          <button>DarkMode</button>
        </div>
      </ToolbarDiv>
    </>
  );
}

export default Toolbar;
