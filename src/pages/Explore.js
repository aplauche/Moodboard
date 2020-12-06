import React, { useEffect, useState, useContext } from "react";

import { Link } from "react-router-dom";
import Board from "../components/Board";
import BoardsGrid from "../components/BoardsGrid";
import BoardFormModal from "../components/BoardFormModal";
import { db } from "../firebase";

import { Context } from "../store";

function Explore() {
  const { appState, appDispatch } = useContext(Context);

  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginationCount, setPaginationCount] = useState(9);
  const [latestDoc, setLatestDoc] = useState(null);

  useEffect(() => {
    db.collection("boards")
      .where("isPublic", "==", true)
      .limit(paginationCount)
      .onSnapshot((snapshot) => {
        setBoards(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data(),
            };
          })
        );
        setLatestDoc(snapshot.docs[paginationCount - 1]);
      });
    setLoading(false);
  }, []);

  const loadMore = () => {
    db.collection("boards")
      .where("isPublic", "==", true)
      .startAfter(latestDoc || 0)
      .limit(paginationCount)
      .onSnapshot((snapshot) => {
        setBoards((prev) => {
          const newArray = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data(),
            };
          });
          return [...prev, ...newArray];
        });
        setLatestDoc(snapshot.docs[paginationCount - 1]);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 style={{ marginBottom: "50px" }}>Recently Posted Boards</h1>
      <BoardFormModal />
      <BoardsGrid>
        {boards.map((board) => {
          return <Board key={board.id} id={board.id} boardInfo={board.data} />;
        })}
      </BoardsGrid>
      {latestDoc != null && (
        <button
          style={{ margin: "20px auto", display: "block" }}
          onClick={loadMore}
        >
          Load More
        </button>
      )}
    </>
  );
}

export default Explore;
