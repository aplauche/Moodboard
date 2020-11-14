import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import Board from "../components/Board";
import BoardsGrid from "../components/BoardsGrid";

function Explore() {
  const boardInfo = {
    image: "#",
    title: "Sample Board",
    createdBy: "Other People",
  };

  return (
    <BoardsGrid>
      <Board boardInfo={boardInfo} />
      <Board boardInfo={boardInfo} />
      <Board boardInfo={boardInfo} />
    </BoardsGrid>
  );
}

export default Explore;
