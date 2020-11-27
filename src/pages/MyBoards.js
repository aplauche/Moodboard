import React, { useEffect, useState, useContext } from "react";

import { Link } from "react-router-dom";
import Board from "../components/Board";
import BoardsGrid from "../components/BoardsGrid";
import BoardFormModal from "../components/BoardFormModal";
import { db } from "../firebase";

import { Context } from "../store";

function MyBoards() {
  const { appState, appDispatch } = useContext(Context);

  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection("boards")
      .where("createdById", "==", appState.user.uid)
      .onSnapshot((snapshot) => {
        setBoards(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data(),
            };
          })
        );
      });
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BoardFormModal />
      <button
        onClick={() => {
          appDispatch({ type: "openBoardFormModal" });
        }}
      >
        Add Board
      </button>
      <BoardsGrid>
        {boards.map((board) => {
          return <Board key={board.id} id={board.id} boardInfo={board.data} />;
        })}
      </BoardsGrid>
    </>
  );
}

export default MyBoards;
