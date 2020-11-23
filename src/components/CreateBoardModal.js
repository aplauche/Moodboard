import React, { useEffect, useState, useContext, useRef } from "react";
import { Context } from "../store";
import { db } from "../firebase";
import firebase from "firebase";
import Modal from "@material-ui/core/Modal";
import Chip from "@material-ui/core/Chip";
import styled from "@emotion/styled";

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

function CreateBoardModal() {
  const { appState, appDispatch } = useContext(Context);

  const [mounted, setMounted] = useState(false);
  const [title, setTitle] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [description, setDescription] = useState("");
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
        if (mounted) {
          setImage(data.url);
          setUploading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCreate = (e) => {
    e.preventDefault();

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
    setTags([]);
    setTagInput("");
    setTitle("");
    setDescription("");
    setImage("");
    handleClose();
  };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleChipDelete = (deletedIndex) => {
    setTags(tags.filter((tag, index) => index !== deletedIndex));
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
            <label htmlFor="image-upload">Cover Photo</label>
            {uploading ? <div>Uploading...</div> : <FileUpload />}
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

            <button style={{ marginTop: "20px" }} type="submit">
              Submit
            </button>
          </form>
        </CreateBoardForm>
      </Modal>
    </>
  );
}

export default CreateBoardModal;
