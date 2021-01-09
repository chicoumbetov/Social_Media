import { stopSubmit } from "redux-form";
import { usersAPI, profileAPI } from "../api/api";
import { PostType, ProfileType, PhotosType } from "../types/types";
//import { InitialStateType } from './auth-reducer';

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
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}
export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any) => {
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
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        }

        default:
            return state;
    }

}

//ActionCreators:

//1
type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPostText: string}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({ type: ADD_POST, newPostText });
//2
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile: profile });
//3
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status: status });
//4
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId });
//5
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos });

//thunk:
export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await usersAPI.getProfile(userId)
    //.then(response => {
    dispatch(setUserProfile(response.data))
    //});
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (error) {
        //dispatch 
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file)

    if (response.data.resultCode === 0) {  //uploaded photo of profile will come in data 
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
} 

export const saveProfile = (profile: PhotosType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)

    if (response.data.resultCode === 0) {  //uploaded photo of profile will come in data
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit("edit-profile", { "contacts": { "facebook": response.data.messages[0] } })) //error facebook form
        //dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))     //general error
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;