import { createSelector } from "reselect";
import { AppStateType } from './redux-store';

export const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.usersData;
}

export const getUsers = createSelector(getUsersSelector, (usersData) => {
    return usersData.filter(u => true);
})

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}


export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalItemsCount;
}

export const getRequestedPage = (state: AppStateType) => {
    return state.usersPage.requestedPage;
}

export const getToggleIsFetching = (state: AppStateType) => {
    return state.usersPage.toggleIsFetching;
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}
/*
        usersData: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        requestedPage: state.usersPage.requestedPage,
        toggleIsFetching: state.usersPage.toggleIsFetching,
        followingInProgress: state.usersPage.followingInProgress
        */