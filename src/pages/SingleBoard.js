import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Toolbar from "../components/Toolbar";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import BoardsGrid from "../components/BoardsGrid";
import PostTeaser from "../components/PostTeaser";

function SingleBoard() {
  const { id } = useParams();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = db
      .collection("boards")
      .doc(id)
      .collection("posts")
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
    setLoading(false);

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Toolbar />
      <BoardsGrid>
        {posts.map((post) => {
          return <PostTeaser key={post.id} id={post.id} postInfo={post.data} />;
        })}
      </BoardsGrid>
    </div>
  );
}

export default SingleBoard;
