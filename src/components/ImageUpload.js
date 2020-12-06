import React, { useEffect, useState, useRef } from "react";
import Loading from "./Loading";
import styled from "@emotion/styled";

const CustomUpload = styled("label")`
  width: 100%;
  color: #e0c3fc;
  border: 1px dashed #e0c3fc;
  display: flex;
  height: 100px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 700;
`;

function ImageUpload({ currentImage, handleUpload }) {
  const [uploading, setUploading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const image = currentImage;

  const fileInput = useRef();

  const handleRemoveImage = () => {
    if (mounted) {
      handleUpload("");
    }
  };

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
          handleUpload(data.url);
          setUploading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (uploading) {
    return (
      <>
        <label htmlFor="image-upload">Cover Photo</label>
        <Loading />
      </>
    );
  }

  return (
    <>
      {image == "" || image == null ? (
        <>
          <CustomUpload htmlFor="image-upload">+ Add Cover Photo</CustomUpload>
          <input
            style={{ display: "none" }}
            id="image-upload"
            onChange={handlePhotoSelected}
            ref={fileInput}
            type="file"
          />
        </>
      ) : (
        <>
          <img src={image} alt="" />
          <button style={{ display: "block" }} onClick={handleRemoveImage}>
            Remove Image
          </button>
        </>
      )}
    </>
  );
}

export default ImageUpload;
