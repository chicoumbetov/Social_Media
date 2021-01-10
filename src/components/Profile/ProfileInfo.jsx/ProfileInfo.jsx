import React from 'react';
//import { setStatus } from '../../../redux/profile-reducer';
import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
//import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../Users/images/user.png';
import { useState } from 'react';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

  let [editMode, setEditMode] = useState(false)

  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) { // if there is length of file then call callback
      savePhoto(e.target.files[0]) //give there chosen photo
    }
  }

  const onSubmit = (formData) => {
    let promise = saveProfile(formData) //dispatched & waiting till executing then by clicking on save button
    promise.then(
      () => {
        setEditMode(false)
      }
    )

  }

  return (
    <div>

      <div className={classes.picture}>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhAuGtEUIzd1uz7lN6VC-_70yoZRGRXPbToQ&usqp=CAU' alt="profile" />
      </div>

      <div className={classes.descriptionBlock}>
        <img src={profile.photos.large || userPhoto} className={classes.mainPhoto} alt="profile" />
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}

        {editMode
          ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
          : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={profile} isOwner={isOwner} />}

        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>

    </div >
  )

}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return <div>
    {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
    <div>
      <b>Full name</b>: {profile.fullName}
    </div>

    <div>
      <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
    </div>

    {profile.lookingForAJob &&
      <div>
        <b>My professional skills</b>: {profile.lookingForAJobDescription}
      </div>
    }

    <div>
      <b>About me</b>: {profile.aboutMe}
    </div>

    <div>
      <b>Contacts: </b>: {Object.keys(profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
      })}
    </div>
  </div>
}

const Contact = ({ contactTitle, contactValue }) => {
  return <div className={classes.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;