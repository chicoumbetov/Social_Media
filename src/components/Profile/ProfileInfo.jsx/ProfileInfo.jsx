import React from 'react';
//import { setStatus } from '../../../redux/profile-reducer';
import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
//import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({profile, status, updateStatus}) => {

  if (!profile) {
    return <Preloader />
  }

  return (
    <div>

      <div className={classes.picture}>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhAuGtEUIzd1uz7lN6VC-_70yoZRGRXPbToQ&usqp=CAU' alt="profile" />
      </div>

      <div className={classes.descriptionBlock}>
        <img src={profile.photos.large} alt="profile" />
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>

    </div >
  )

}

export default ProfileInfo;