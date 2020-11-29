import React, { useEffect } from "react";
import styled from "@emotion/styled";
import Masonry from "react-masonry-css";

const MasonryGrid = styled(Masonry)`
  display: flex;
  margin-left: -20px; /* gutter size offset */
  width: auto;

  & .masonry-grid_column {
    padding-left: 20px; /* gutter size */
    background-clip: padding-box;
  }

  & .masonry-grid_column > div {
    margin-bottom: 20px;
  }
`;

function BoardsGrid({ children }) {
  const breakpointColumnsObj = {
    default: 4,
    1500: 3,
    700: 2,
    500: 1,
  };

  return (
    <MasonryGrid
      breakpointCols={breakpointColumnsObj}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {children}
    </MasonryGrid>
  );
}

export default BoardsGrid;
