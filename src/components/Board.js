import React, { useEffect, useState, useContext } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { Context } from "../store";

const BoardDiv = styled("div")`
  width: 100%;
  box-shadow: 2px 2px 18px rgba(0, 0, 0, 0.2);
  position: relative;
  color: #efefef;
  text-decoration: none;
  border-radius: 6px;
  margin-bottom: 20px;
  display: block;

  & a {
    color: white;
    text-decoration: none;
  }

  & .cover-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }

  & .profile-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;

    & img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 20px;
      margin-right: 12px;
    }
  }

  & .info {
    padding: 20px 20px 20px 20px;
    background: #212529;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  & .board-title {
    font-size: 1.4rem;
    font-family: "Playfair Display", serif;
    margin-bottom: 20px;
  }
`;

function Board({ boardInfo, id }) {
  const { appState, appDispatch } = useContext(Context);

  const [profileInfo, setProfileInfo] = useState(null);

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

  useEffect(() => {
    const getProfileData = async () => {
      const snapshot = await db
        .collection("users")
        .where("uid", "==", boardInfo.createdById)
        .get();
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        setProfileInfo(data);
      }
    };
    getProfileData();
  }, []);

  return (
    <BoardDiv>
      <Link to={"/boards/" + id}>
        <img className="cover-image" src={boardInfo.image} alt="" />
      </Link>
      <div className="info">
        <Link to={"/boards/" + id}>
          <p className="board-title">{boardInfo.title}</p>
        </Link>
        <Link className="profile-info" to={`/profile/${profileInfo?.uid}`}>
          <img src={profileInfo?.profilePic} alt="" />
          <p>{profileInfo?.displayName}</p>
        </Link>
        {boardInfo.createdById == appState.user.uid && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                appDispatch({ type: "openBoardFormModal", data: id });
              }}
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                deleteBoard(id);
              }}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </BoardDiv>
  );
}

export default Board;
