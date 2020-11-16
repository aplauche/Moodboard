import React, { useEffect, useState, useContext, useRef } from "react";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fileInput = useRef();

  const handlePhotoSelected = (e) => {
    setUploading(true);
    let cloudURL = "https://api.Cloudinary.com/v1_1/fsdm/image/upload";
    const formData = new FormData();
    formData.append("file", fileInput.current.files[0]);
    formData.append("upload_preset", "openupload");

    const options = {
      method: "POST",
      body: formData,
    };

    fetch(cloudURL, options)
      .then((res) => res.json())
      .then((data) => {
        setImage(data.url);
        setUploading(false);
      })
      .catch((err) => console.log(err));
  };

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

  const FileUpload = () => {
    return (
      <>
        {image == "" ? (
          <input
            id="image-upload"
            onChange={handlePhotoSelected}
            ref={fileInput}
            type="file"
          />
        ) : (
          <img src={image} alt="" />
        )}
      </>
    );
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
            <label htmlFor="image-upload">Cover Photo</label>

            {uploading ? <div>Uploading...</div> : <FileUpload />}

            <button type="submit">Submit</button>
          </form>
        </CreateBoardForm>
      </Modal>
    </>
  );
}

export default CreateBoardModal;
