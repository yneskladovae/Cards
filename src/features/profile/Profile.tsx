import React from "react";
import s from "../profile/profile.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authThunks } from "../auth/auth.slice";

const Profile = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  const dispatch = useAppDispatch();

  if (!profile) {
    dispatch(authThunks.authMe());
  }

  return (
    <div className={s.profileBlock}>
      <div className={s.profileBlockContainer}>
        <h2>Personal Information</h2>
        <p>{profile?.name}</p>
        <img src={profile?.avatar} alt="avatar" />
        <div>{profile?.email}</div>
        <button>Log out</button>
      </div>
    </div>
  );
};

export default Profile;
