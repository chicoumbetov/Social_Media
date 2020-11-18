import { usersAPI } from '../api/api';
import { updateObjectInArray } from '../utils/object-helpers-for-user-reducers';

//const ADD_USERS = 'ADD_USERS';
//const UPDATE_NEW_USERS = 'UPDATE_NEW_USERS';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_REQUESTED_PAGE = 'SET_REQUESTED_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    usersData: [],
    pageSize: 100,
    totalItemsCount: [],
    requestedPage: 1,
    toggleIsFetching: true,
    followingInProgress: []
    //    newUsers: 'IT_KA.Users'
}
const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                //users: [...state.users],same as: users: state.users.map( callbackfn: u => u)  cause copy whole array and change whole object users.
                usersData: updateObjectInArray(state.usersData, action.id, "id", { followed: true })
                /*
                usersData: state.usersData.map(u => {
                    if (u.id === action.id) {
                        return { ...u, followed: true }      //we want change only following status, nothing more by clicking on button follow, un follow
                    }
                    return u;
                })
                */
            }

        case UNFOLLOW:
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.id, "id", { followed: false })
                /*
                usersData: state.usersData.map(u => {
                    if (u.id === action.id) {
                        return { ...u, followed: false }      //we want change only following status, nothing more by clicking on button follow, un follow
                    }
                    return u;
                })
                */
            }

        case SET_USERS: {
            return {
                ...state,
                //usersData: [...state.usersData, ...action.usersData] //adds all users at the end of first page
                usersData: action.usersData //adds all users each time on different next page.
                // state.users - that already have been inside, action.users - new users that were created.
            }
        }

        case SET_REQUESTED_PAGE: {
            return {
                ...state, requestedPage: action.requestedPage // state.users - that already have been inside, action.users - new users that were created.
            }
        }

        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state, totalUsersCount: action.count // state.users - that already have been inside, action.users - new users that were created.
            }
        }

        case TOGGLE_IS_FETCHING: {
            return {
                ...state, toggleIsFetching: action.toggleIsFetching // state.users - that already have been inside, action.users - new users that were created.
            }
        }

        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [state.followingInProgress, action.id] //if isFetching true then we destructure and add at the end id which is in action
                    : state.followingInProgress.filter(id => id !== action.id) //if false then we create new array with filter
                // state.users - that already have been inside, action.users - new users that were created.
            }
        }
        default:
            return state;
    }
}

//actionCreators. AC abreviation deleted at the end of words
export const followSuccess = (id) => ({ type: FOLLOW, id })
export const unfollowSuccess = (id) => ({ type: UNFOLLOW, id })
export const setUsers = (usersData) => ({ type: SET_USERS, usersData })
export const setRequestedPage = (requestedPage) => ({ type: SET_REQUESTED_PAGE, requestedPage })
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, count: isFetching })
export const toggleFollowingProgress = (isFetching, id) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, count: isFetching, id })

//export const unfollowAC = () => ({ type: UNFOLLOW });
//export const updateNewUsersActionCreator = (user) => ({ type: UPDATE_NEW_USERS, newText: user });

//thunks: getUsersThunkCreator
export const getUsersThunkCreator = (requestedPage, pageSize) => {    //getUsers = getUsersThunkCreator page of Dimych = requestedPage
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setRequestedPage(requestedPage));

        let data = await usersAPI.getUsers(requestedPage, pageSize)
        //.then(data => {
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
        //});
    }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId)) //1first we dispatch followingProgress
    let response = await apiMethod(userId)                         //2we unfollow(send request)
    //.then(response => {
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))     //3when unfollow finishes, we confirm unfollow in state
    }
    dispatch(toggleFollowingProgress(false, userId))//4 then we turn off, disable buttons
    //});
}

export const follow = (userId) => {

    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}

export const unfollow = (userId) => {

    return async (dispatch) => {
        //let apiMethod = usersAPI.unfollow.bind(usersAPI)
        //let actionCreator = unfollowSuccess
        //we put previous 2 lines directrly:
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    }
}

export default usersReducer;

//refactored by followUnfollowFlow and by async
/*
export const follow = (userId) => {

    return async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI)
        let actionCreator = followSuccess

        dispatch(toggleFollowingProgress(true, userId)) //1first we dispatch followingProgress
        let response = await apiMethod(userId)                         //2we unfollow(send request)
        //.then(response => {
        if (response.data.resultCode === 0) {
            dispatch(actionCreator(userId))     //3when unfollow finishes, we confirm unfollow in state
        }
        dispatch(toggleFollowingProgress(false, userId))//4 then we turn off, disable buttons
        //});
    }
}

export const unfollow = (userId) => {

    return async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI)
        let actionCreator = unfollowSuccess

        dispatch(toggleFollowingProgress(true, userId))
        let response = await apiMethod(userId)
        //.then(response => {
        if (response.data.resultCode === 0) {
            dispatch(actionCreator(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
        //});
    }
}
*/