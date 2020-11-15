import React, { useEffect, useState, useContext } from "react";

import { Link } from "react-router-dom";
import Board from "../components/Board";
import BoardsGrid from "../components/BoardsGrid";
import CreateBoardModal from "../components/CreateBoardModal";
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
        let newBoards = [];
        snapshot.forEach((doc) => {
          newBoards.push(doc.data());
        });
        setBoards(newBoards);
      });
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CreateBoardModal />
      <BoardsGrid>
        {boards.map((board, index) => {
          return <Board key={index} boardInfo={board} />;
        })}
      </BoardsGrid>
    </>
  );
}

export default MyBoards;
