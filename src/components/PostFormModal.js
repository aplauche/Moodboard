import React, { useEffect, useState, useContext, useRef } from "react";
import { Context } from "../store";
import { db } from "../firebase";
import firebase from "firebase";
import Modal from "@material-ui/core/Modal";
import Chip from "@material-ui/core/Chip";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import ImageUpload from "./ImageUpload";

const CreateBoardForm = styled("div")`
  padding: 50px;
  background: #212529;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  max-width: 600px
  width: 90vw;

  &:focus {
    outline: none;
  }

  & h2 {
    margin-bottom: 20px;
  }

  & form {
    display: flex;
    flex-direction: column;
  }

  & input,
  textarea {
    margin-bottom: 10px;
  }

  & .tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  & img {
    max-width: 100%;
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin-bottom: 20px;
  }
`;

function CreatePostModal() {
  const { appState, appDispatch } = useContext(Context);
  const { id } = useParams();

  const [mounted, setMounted] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const editMode = appState.postFormModal.prepopulate ? true : false;

  const fileInput = useRef();

  useEffect(() => {
    if (appState.postFormModal.prepopulate == null) {
      return;
    }

    const getFormData = async () => {
      const snapshot = await db
        .collection("boards")
        .doc(id)
        .collection("posts")
        .doc(appState.postFormModal.prepopulate)
        .get();
      const data = snapshot.data();
      setTitle(data.title);
      setDescription(data.description);
      setImage(data.image);
      setUrl(data.url);
    };
    getFormData();
  }, [appState.postFormModal.prepopulate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (appState.postFormModal.prepopulate != null) {
      db.collection("boards")
        .doc(id)
        .collection("posts")
        .doc(appState.postFormModal.prepopulate)
        .update({
          title: title,
          description: description,
          image: image,
          url: url,
        });
    } else {
      db.collection("boards").doc(id).collection("posts").add({
        title: title,
        description: description,
        image: image,
        url: url,
        createdBy: appState.user.displayName,
        createdById: appState.user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    handleClose();
  };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleClose = () => {
    appDispatch({ type: "closePostFormModal" });
    setTitle("");
    setDescription("");
    setImage("");
    setUrl("");
  };

  const handleUpload = (image) => {
    setImage(image);
  };

  return (
    <Modal open={appState.postFormModal.isOpen} onClose={handleClose}>
      <CreateBoardForm>
        <h2>Create A Post</h2>
        <form onSubmit={handleSubmit}>
          <ImageUpload currentImage={image} handleUpload={handleUpload} />
          <label htmlFor="title">Title</label>
          <input
            required={true}
            id="title"
            name="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            type="text"
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="8"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
            type="text"
          ></textarea>

          <label htmlFor="url">Link To (optional):</label>
          <input
            id="url"
            name="url"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            value={url}
            type="text"
          />

          <button style={{ marginTop: "20px" }} type="submit">
            Submit
          </button>
        </form>
      </CreateBoardForm>
    </Modal>
  );
}

export default CreatePostModal;
