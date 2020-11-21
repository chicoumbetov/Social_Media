import React from 'react';
//import store from '../../redux/redux-store';
//import { addPost } from '../../redux/state';
//import MyPosts from './MyPosts/MyPosts';
import MyPostsContainer from './MyPosts/MyPostsContainer';
//import cl from './Profile.module.css'; className={cl.profile}
import ProfileInfo from './ProfileInfo.jsx/ProfileInfo';

const Profile = (props) => {

  return (
    <div >
      <ProfileInfo savePhoto={props.savePhoto} 
                   isOwner={props.isOwner} 
                   profile={props.profile} 
                   status={props.status} 
                   saveProfile={props.saveProfile}
                   updateStatus={props.updateStatus} />
      <MyPostsContainer /> 
      
    </div>
  )
}

export default Profile;

//store={props.store} don't need since we have StoreContext API instead of props.

      //postsData={props.profilePage.postsData}
      //newPostText={props.profilePage.newPostText}
      //dispatch={props.dispatch}
      //now updateNewPostText and addPost are in dispatch:

      //updateNewPostText={props.updateNewPostText}
      //addPost={props.addPost}