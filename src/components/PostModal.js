import React, { useEffect, useState, useContext, useRef } from "react";
import { Context } from "../store";
import { db } from "../firebase";
import firebase from "firebase";
import Modal from "@material-ui/core/Modal";
import Chip from "@material-ui/core/Chip";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

const PostView = styled("div")`
  padding: 50px;
  background: #212529;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  width: 90vw;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;

  & img {
    width: 100%;
    height: auto;
    max-height: 70vh;
    object-fit: contain;
  }

  & h2 {
    margin-bottom: 32px;
  }

  & p {
    margin-bottom: 50px;
  }
`;

function PostModal() {
  const { appState, appDispatch } = useContext(Context);
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (appState.postModal.postId == null) {
      return;
    }
    const getFormData = async () => {
      const snapshot = await db
        .collection("boards")
        .doc(id)
        .collection("posts")
        .doc(appState.postModal.postId)
        .get();
      const data = snapshot.data();
      setData(data);
      setLoading(false);
    };
    getFormData();
  }, [appState.postModal.postId]);

  const handleClose = () => {
    appDispatch({ type: "closePostModal" });
    setData(null);
    setLoading(true);
  };

  return (
    <Modal open={appState.postModal.isOpen} onClose={handleClose}>
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading />
        </div>
      ) : (
        <PostView>
          <img src={data.image} />
          <div>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            {data.url && (
              <a className="button" href={data.url} target="_blank">
                View Original
              </a>
            )}
          </div>
        </PostView>
      )}
    </Modal>
  );
}

export default PostModal;
