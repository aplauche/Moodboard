import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { db } from "../firebase";

const BoardDiv = styled(Link)`
  width: 100%;
  box-shadow: 2px 2px 18px rgba(0, 0, 0, 0.2);
  position: relative;
  color: #efefef;
  text-decoration: none;

  & button {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  & img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  & .info {
    padding: 20px 20px 40px 20px;
    background: #212529;
  }

  & .board-title {
    font-size: 1.4rem;
    font-family: "Playfair Display", serif;
    font-size: 1.75rem;
    margin-bottom: 10px;
  }

  & .username {
    font-size: 0.85rem;
    font-weight: 700;
  }
`;

const deleteBoard = (id) => {
  db.collection("boards")
    .doc(id)
    .delete()
    .then(() => {
      console.log("deleted");
    })
    .catch((err) => {
      console.log(err);
    });
};

function Board({ boardInfo, id }) {
  return (
    <BoardDiv to={"/boards/" + id}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          deleteBoard(id);
        }}
      >
        Delete
      </button>
      <img src={boardInfo.image} alt="" />
      <div className="info">
        <p className="board-title">{boardInfo.title}</p>
        <p className="username">{boardInfo.createdBy}</p>
      </div>
    </BoardDiv>
  );
}

export default Board;
