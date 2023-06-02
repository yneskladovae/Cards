import React, { ChangeEvent, useEffect, useState } from "react";
import s from "../profile/profile.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import withoutAvatar from "../../assets/png/unknown.png";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Icon } from "@mui/material";
import { authThunks } from "../auth/auth.slice";

const Profile = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(() => {
    const storedName = localStorage.getItem("profileName");
    return storedName ? storedName : profile?.name;
  });

  useEffect(() => {
    if (newName) return localStorage.setItem("profileName", newName);
  }, [newName]);

  console.log(newName);

  const editModeHandler = () => {
    setEditMode(!editMode);
  };

  const newNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  const setNewInfoHandler = () => {
    const payload = { name: newName };
    dispatch(authThunks.editProfileInfo(payload));
    setEditMode(false);
  };

  const logOutHandler = () => {
    dispatch(authThunks.logOut());
  };

  return (
    <div className={s.profileBlock}>
      <div className={s.profileBlockContainer}>
        <h2>Personal Information</h2>
        <img
          className={s.avatar}
          src={profile?.avatar ? profile.avatar : withoutAvatar}
          alt="avatar"
        />
        <div className={s.name}>
          {editMode ? (
            <>
              <input
                value={newName}
                autoFocus
                onChange={newNameChangeHandler}
              />
              <button onClick={setNewInfoHandler}>Save</button>
            </>
          ) : (
            <>
              <p>{profile?.name}</p>
              <Icon
                className={s.edit}
                component={BorderColorIcon}
                onClick={editModeHandler}
              />
            </>
          )}
        </div>

        <div>{profile?.email}</div>
        <button onClick={logOutHandler}>Log out</button>
      </div>
    </div>
  );
};

export default Profile;
