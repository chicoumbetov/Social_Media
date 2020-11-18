import { createSelector } from "reselect";

export const getUsersSelector = (state) => {
    return state.usersPage.usersData;
}

export const getUsers = createSelector(getUsersSelector, (usersData) => {
    return usersData.filter(u => true);
})

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}


export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getRequestedPage = (state) => {
    return state.usersPage.requestedPage;
}

export const getToggleIsFetching = (state) => {
    return state.usersPage.toggleIsFetching;
}

export const getFollowingInProgress = (state) => {
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