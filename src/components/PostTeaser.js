import React, { useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import { Context } from "../store";

const BoardDiv = styled("div")`
  width: 100%;
  box-shadow: 2px 2px 18px rgba(0, 0, 0, 0.2);
  position: relative;
  border-radius: 10px;

  & button {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  & img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 10px;
  }

  & .info {
    color: white;
    position: absolute;
    bottom: 10px;
    left: 10px;
  }

  & .post-title {
    font-size: 1.4rem;
  }

  & .username {
    font-size: 0.8 rem;
    font-weight: 700;
  }
`;

function PostTeaser({ postInfo, id }) {
  const { appState, appDispatch } = useContext(Context);

  const params = useParams();

  const deletePost = () => {
    db.collection("boards")
      .doc(params.id)
      .collection("posts")
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
    <BoardDiv>
      <button
        onClick={() => {
          deletePost();
        }}
      >
        Delete
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          appDispatch({ type: "openPostFormModal", data: id });
        }}
      >
        Edit
      </button>
      <img src={postInfo.image} alt="" />
      <div className="info">
        <p className="post-title">{postInfo.title}</p>
        <p className="username">{postInfo.createdBy}</p>
      </div>
    </BoardDiv>
  );
}

export default PostTeaser;
