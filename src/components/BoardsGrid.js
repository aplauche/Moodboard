import React, { useEffect } from "react";
import styled from "@emotion/styled";

const BoardGrid = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;

function BoardsGrid({ children }) {
  return <BoardGrid>{children}</BoardGrid>;
}

export default BoardsGrid;
