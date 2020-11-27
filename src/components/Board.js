import React, { useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { Context } from "../store";

const BoardDiv = styled(Link)`
  width: 100%;
  box-shadow: 2px 2px 18px rgba(0, 0, 0, 0.2);
  position: relative;
  color: #efefef;
  text-decoration: none;
  background: #212529;
  border-radius: 10px;

  & button {
    // position: absolute;
    // top: 10px;
    // right: 10px;
  }

  & img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }

  & .info {
    padding: 20px 20px 40px 20px;
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

function Board({ boardInfo, id }) {
  const { appState, appDispatch } = useContext(Context);

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

  return (
    <BoardDiv to={"/boards/" + id}>
      {boardInfo.createdById == appState.user.uid && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              deleteBoard(id);
            }}
          >
            Delete
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              appDispatch({ type: "openBoardFormModal", data: id });
            }}
          >
            Edit
          </button>
        </>
      )}
      <img src={boardInfo.image} alt="" />
      <div className="info">
        <p className="board-title">{boardInfo.title}</p>
        <p className="username">{boardInfo.createdBy}</p>
      </div>
    </BoardDiv>
  );
}

export default Board;
