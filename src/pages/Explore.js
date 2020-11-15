import React, { useEffect, useState, useContext } from "react";

import { Link } from "react-router-dom";
import Board from "../components/Board";
import BoardsGrid from "../components/BoardsGrid";
import { db } from "../firebase";

import { Context } from "../store";

function Explore() {
  const { appState, appDispatch } = useContext(Context);

  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection("boards").onSnapshot((snapshot) => {
      setBoards(
        snapshot.docs.map((doc) => {
          return doc.data();
        })
      );
    });
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BoardsGrid>
      {boards.map((board, index) => {
        return <Board key={index} boardInfo={board} />;
      })}
    </BoardsGrid>
  );
}

export default Explore;
