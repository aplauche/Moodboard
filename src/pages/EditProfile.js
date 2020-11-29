import React, { useEffect, useState, useContext } from "react";

import styled from "@emotion/styled";
import ImageUpload from "../components/ImageUpload";
import { db } from "../firebase";
import firebase from "firebase";
import { Context } from "../store";

const EditProfileForm = styled("div")`
  width: 100%;
  max-width: 680px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 50px;
  margin: 50px auto 50px auto;

  &:focus {
    outline: none;
  }

  & h2 {
    margin-bottom: 20px;
  }

  & .form {
    display: flex;
    flex-direction: column;
  }

  & input,
  textarea,
  button {
    margin-bottom: 10px;
  }

  & img {
    max-width: 100%;
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin-bottom: 20px;
    margin-top: 20px;
    border-radius: 50%;
  }
`;

function EditProfile() {
  const { appState, appDispatch } = useContext(Context);

  const [displayName, setDisplayName] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [docId, setDocId] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const getFormData = async () => {
      const snapshot = await db
        .collection("users")
        .where("uid", "==", appState.user.uid)
        .get();
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        setDisplayName(data.displayName);
        setWebsite(data.website);
        setBio(data.bio);
        setProfilePic(data.profilePic);
        setDocId(snapshot.docs[0].id);
        setEditMode(true);
      }
    };
    getFormData();
  }, []);

  const handleSaveProfile = async () => {
    if (editMode) {
      await db.collection("users").doc(docId).update({
        displayName: displayName,
        website: website,
        bio: bio,
        profilePic: profilePic,
      });
    } else {
      await db.collection("users").add({
        displayName: displayName,
        website: website,
        bio: bio,
        profilePic: profilePic,
        uid: appState.user.uid,
      });
    }
  };

  const handleUpload = (image) => {
    setProfilePic(image);
  };

  return (
    <>
      <h1>My Profile</h1>
      <EditProfileForm>
        <div>
          <ImageUpload currentImage={profilePic} handleUpload={handleUpload} />
        </div>
        <div className="form">
          <label htmlFor="display-name">Display Name</label>
          <input
            id="display-name"
            type="text"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
          />
          <label htmlFor="website">Portfolio Website</label>
          <input
            id="website"
            type="text"
            value={website}
            onChange={(e) => {
              setWebsite(e.target.value);
            }}
          />
          <label htmlFor="bio">Profile Bio</label>
          <textarea
            id="bio"
            rows="8"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
          ></textarea>
          <button onClick={handleSaveProfile}>Save Profile</button>
        </div>
      </EditProfileForm>
    </>
  );
}

export default EditProfile;
