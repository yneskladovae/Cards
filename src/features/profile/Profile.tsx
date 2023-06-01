import React, { ChangeEvent, useState } from "react";
import s from "../profile/profile.module.css";
import { useAppSelector } from "../../app/hooks";
import withoutAvatar from "../../assets/png/unknown.png";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Icon } from "@mui/material";

const Profile = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(profile?.name);

  const editModeHandler = () => {
    setEditMode(!editMode);
  };

  const newNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value);
    console.log(e.currentTarget.value);
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
                onBlur={editModeHandler}
                onChange={newNameChangeHandler}
              />
              <button>Save</button>
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
        <button>Log out</button>
      </div>
    </div>
  );
};

export default Profile;
