import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store";
import { db } from "../firebase";
import firebase from "firebase";
import Modal from "@material-ui/core/Modal";
import styled from "@emotion/styled";

const CreateBoardForm = styled("div")`
  padding: 50px;
  background: white;
  border-radius: 10px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;

  & h2 {
    margin-bottom: 20px;
  }

  & form {
    display: flex;
    flex-direction: column;
  }

  & input {
    margin-bottom: 10px;
  }
`;

function CreateBoardModal() {
  const { appState, appDispatch } = useContext(Context);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreate = (e) => {
    e.preventDefault();

    db.collection("boards").add({
      title: title,
      image: image,
      createdBy: appState.user.displayName,
      createdById: appState.user.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      ownerIds: [appState.user.uid],
    });
    handleClose();
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button
        style={{ marginBottom: "20px", textAlign: "right" }}
        onClick={handleOpen}
      >
        Add Board
      </button>
      <Modal open={modalOpen} onClose={handleClose}>
        <CreateBoardForm>
          <h2>Create A Board</h2>
          <form onSubmit={handleCreate}>
            <label htmlFor="title">Board Name:</label>
            <input
              id="title"
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              type="text"
            />
            <button type="submit">Submit</button>
          </form>
        </CreateBoardForm>
      </Modal>
    </>
  );
}

export default CreateBoardModal;
