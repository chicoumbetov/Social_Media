import { stopSubmit } from "redux-form";
import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

//let sum = (a = -1 , b = 0 ) => {
//  return a + b;}
//sum(); 
//state is not defined so we need give something initial

let initialState = {
    postsData: [
        { id: 1, message: "Hi, How is it going?", likesCount: 11 },
        { id: 2, message: "Hi, How r u?", likesCount: 12 }
    ],
    profile: null,
    status: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_POST: {
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesCount: 0
            };
            //let stateCopy = {}
            return {
                ...state, //creating copy of initial state
                postsData: [...state.postsData, newPost],
                newPostText: ''

            };
            //state.postsData.push(newPost);
            //stateCopy.postsData = [...state.postsData]; //creating new array which is equal to old array
            //stateCopy.postsData.push(newPost); //and newPost will be pushed into copy array(newArray)
            //state.newPostText = '';
            //return state;
            //stateCopy.newPostText = '';
            //return stateCopy;
        }

        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }

        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }

        case DELETE_POST: {
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id !== action.postId)
            }
        }

        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos }
            }
        }

        default:
            return state;
    }

}

//ActionCreators:
export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile: profile });
export const setStatus = (status) => ({ type: SET_STATUS, status: status });
export const deletePost = (postId) => ({ type: DELETE_POST, postId });
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos });

//thunk:
export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId)
    //.then(response => {
    dispatch(setUserProfile(response.data))
    //});
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) { 
    dispatch(setStatus(status))
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)

    if (response.data.resultCode === 0) {  //uploaded photo of profile will come in data 
    dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)

    if (response.data.resultCode === 0) {  //uploaded photo of profile will come in data
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit("edit-profile", {"contacts": {"facebook": response.data.messages[0] }} )) //error facebook form
        //dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))     //general error
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;