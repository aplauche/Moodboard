import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { db } from "../firebase";

import { Context } from "../store";

import Board from "../components/Board";
import BoardsGrid from "../components/BoardsGrid";

const ProfileHeader = styled("div")`
  width: 100%;
  max-width: 600px;
  margin: 0px auto 50px auto;
  padding-bottom: 32px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 50px;
  border-bottom: 1px solid white;

  & img {
    width: 150px;
    height: 150px;
    object-fit: contain;
    border-radius: 75px;
  }

  & p {
    margin: 12px 0px 24px 0px;
  }
`;

function ViewProfile() {
  const { appState, appDispatch } = useContext(Context);

  const params = useParams();

  const [profileInfo, setProfileInfo] = useState(null);
  const [boards, setBoards] = useState(null);

  useEffect(() => {
    const getProfileData = async () => {
      const snapshot = await db
        .collection("users")
        .where("uid", "==", params.id)
        .get();
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        setProfileInfo(data);
      }
    };
    getProfileData();
  }, []);

  useEffect(() => {
    db.collection("boards")
      .where("createdById", "==", params.id)
      .orderBy("timestamp", "desc")
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
  }, []);

  return (
    <>
      <ProfileHeader>
        <img src={profileInfo?.profilePic} alt="" />
        <div>
          <h1>{profileInfo?.displayName}</h1>
          <p>{profileInfo?.bio}</p>
          <a className="button" href={profileInfo?.website} target="_blank">
            View Website
          </a>
        </div>
      </ProfileHeader>
      <BoardsGrid>
        {boards?.map((board) => {
          return <Board key={board.id} id={board.id} boardInfo={board.data} />;
        })}
      </BoardsGrid>
    </>
  );
}

export default ViewProfile;
