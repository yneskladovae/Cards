import React from 'react';
import s from "../profile/profile.module.css";
import {useAppSelector} from "../../app/hooks";


const Profile = () => {

    const profile = useAppSelector((state) => state.auth.profile)

    return (
        <div className={s.profileBlock}>
            <div className={s.profileBlockContainer}>
                <h2>Personal Information</h2>
                <img src="" alt=""/>
                <div>{profile?.email}</div>
            </div>
        </div>
    );
};

export default Profile;