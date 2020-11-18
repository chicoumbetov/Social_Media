//import React from 'react';
import { connect } from 'react-redux';
import { addPostActionCreator } from '../../../redux/profile-reducer';
//import StoreContext from '../../../StoreContext';
import MyPosts from './MyPosts';

const mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostText) => {
      dispatch(addPostActionCreator(newPostText))
    }
  }
}
//creating of container component for presentational component MyPosts.
let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;