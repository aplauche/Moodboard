import React, { useEffect, useState, useContext, useRef } from "react";
import { Context } from "../store";
import { db } from "../firebase";
import firebase from "firebase";
import Modal from "@material-ui/core/Modal";
import Chip from "@material-ui/core/Chip";
import styled from "@emotion/styled";
import ImageUpload from "./ImageUpload";

const CreateBoardForm = styled("div")`
  padding: 50px;
  background: #212529;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  max-width: 600px;
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

function CreateBoardModal() {
  const { appState, appDispatch } = useContext(Context);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [description, setDescription] = useState("");

  const editMode = appState.boardFormModal.prepopulate ? true : false;

  useEffect(() => {
    if (appState.boardFormModal.prepopulate == null) {
      return;
    }

    const getFormData = async () => {
      const snapshot = await db
        .collection("boards")
        .doc(appState.boardFormModal.prepopulate)
        .get();
      const data = snapshot.data();
      setTags(data.tags);
      setTagInput("");
      setTitle(data.title);
      setDescription(data.description);
      setImage(data.image);
    };
    getFormData();
  }, [appState.boardFormModal.prepopulate]);

  const handleUpload = (image) => {
    setImage(image);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
    } else {
      db.collection("boards").add({
        title: title,
        description: description,
        tags: tags,
        image: image,
        createdBy: appState.user.displayName,
        createdById: appState.user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        ownerIds: [appState.user.uid],
      });
    }

    handleClose();
  };

  const handleClose = () => {
    appDispatch({ type: "closeBoardFormModal" });
    setTags([]);
    setTagInput("");
    setTitle("");
    setDescription("");
    setImage("");
  };

  const handleChipDelete = (deletedIndex) => {
    setTags(tags.filter((tag, index) => index !== deletedIndex));
  };

  return (
    <Modal open={appState.boardFormModal.isOpen} onClose={handleClose}>
      <CreateBoardForm>
        <h2>{editMode ? "Edit Board" : "Create Board"}</h2>
        <form onSubmit={handleSubmit}>
          <ImageUpload currentImage={image} handleUpload={handleUpload} />
          <label htmlFor="title">Board Name:</label>
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
          <label htmlFor="description">Board Description:</label>
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

          <label htmlFor="tags">Tags:</label>
          <input
            id="tags"
            name="tags"
            onChange={(e) => {
              setTagInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.keyCode == 188) {
                e.preventDefault();
                setTags([...tags, e.target.value]);
                setTagInput("");
              }
            }}
            value={tagInput}
            type="text"
          />

          <div className="tags">
            {tags.length > 0 &&
              tags.map((tag, index) => {
                return (
                  <Chip
                    label={tag}
                    key={index}
                    onDelete={() => {
                      handleChipDelete(index);
                    }}
                    style={{
                      background: "linear-gradient(45deg,#e0c3fc, #8ec5fc)",
                    }}
                  />
                );
              })}
          </div>

          {editMode ? (
            <button style={{ marginTop: "20px" }} type="submit">
              Update Board
            </button>
          ) : (
            <button style={{ marginTop: "20px" }} type="submit">
              Create Board
            </button>
          )}
        </form>
      </CreateBoardForm>
    </Modal>
  );
}

export default CreateBoardModal;
