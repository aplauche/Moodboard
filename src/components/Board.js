import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const BoardDiv = styled(Link)`
  width: 100%;
  box-shadow: 2px 2px 18px rgba(0, 0, 0, 0.2);

  & img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  & .info {
    padding: 20px;
    background: white;
  }

  & .board-title {
    font-size: 1.4rem;
  }

  & .username {
    font-size: 0.8 rem;
    font-weight: 700;
  }
`;

function Board({ boardInfo, id }) {
  return (
    <BoardDiv to={"/boards/" + id}>
      <img src={boardInfo.image} alt="" />
      <div className="info">
        <p className="board-title">{boardInfo.title}</p>
        <p className="username">{boardInfo.createdBy}</p>
      </div>
    </BoardDiv>
  );
}

export default Board;
