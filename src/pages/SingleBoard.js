import React, { useEffect, useState, useContext } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Toolbar from "../components/Toolbar";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import BoardsGrid from "../components/BoardsGrid";
import PostTeaser from "../components/PostTeaser";
import { Context } from "../store";
import Loading from "../components/Loading";
import PostModal from "../components/PostModal";

function SingleBoard() {
  const { id } = useParams();

  const { appState, appDispatch } = useContext(Context);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [boardData, setBoardData] = useState(null);

  useEffect(() => {
    let unsubscribe = db
      .collection("boards")
      .doc(id)
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data(),
            };
          })
        );
      });

    db.collection("boards")
      .doc(id)
      .get()
      .then((doc) => {
        setBoardData(doc.data());
        setLoading(false);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <PostModal />
      <h1 style={{ marginBottom: "20px" }}>{boardData.title}</h1>
      {boardData.createdById == appState.user.uid && (
        <Toolbar boardName={boardData.title} />
      )}
      <BoardsGrid>
        {posts.map((post) => {
          return <PostTeaser key={post.id} id={post.id} postInfo={post.data} />;
        })}
      </BoardsGrid>
    </div>
  );
}

export default SingleBoard;
