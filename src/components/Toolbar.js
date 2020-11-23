import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import CreatePostModal from "./CreatePostModal";

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

function Toolbar() {
  return (
    <ToolbarDiv>
      <div className="left">
        <p>4 Columns</p>
      </div>
      <div className="right">
        <CreatePostModal />
        <button>Titles</button>
        <button>Comments</button>
        <button>DarkMode</button>
      </div>
    </ToolbarDiv>
  );
}

export default Toolbar;
