import React from 'react';
//import { setStatus } from '../../../redux/profile-reducer';
import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
//import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../Users/images/user.png';

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {

  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) { // if there is length of file then call callback
      savePhoto(e.target.files[0]) //give there chosen photo
    }
  }

  return (
    <div>

      <div className={classes.picture}>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhAuGtEUIzd1uz7lN6VC-_70yoZRGRXPbToQ&usqp=CAU' alt="profile" />
      </div>

      <div className={classes.descriptionBlock}>
        <img src={profile.photos.large || userPhoto} className={classes.mainPhoto} alt="profile" />
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>

    </div >
  )

}

export default ProfileInfo;