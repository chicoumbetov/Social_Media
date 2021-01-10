import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, getUsersThunkCreator } from '../../redux/users-reducer';
//import * as Axios from 'axios'; now it it in api.js
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import UserInfo from './UsersInfo/UserInfo';
//import { usersAPI } from '../../api/api'; // axios came through this.
import styles from './Users.module.css';
//import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import {
    getRequestedPage,
    getFollowingInProgress,
    getToggleIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from '../../redux/user-selectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    //properties
    requestedPage: number 
    pageSize: number
    toggleIsFetching: boolean
    totalUsersCount: number
    usersData: Array<UserType>
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    //callbacks
    getUsers: (requestedPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

//came through props
type OwnPropsType = {
    pageTitle: string
}

//reunions all PropsType above
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        let {requestedPage, pageSize} = this.props;
        //if (this.props.usersData.length === 0) {}
        this.props.getUsers(requestedPage, pageSize);

        /*this.props.toggleIsFetching(true);

        usersAPI.getUsers(this.props.RequestedPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount);
        });*/

    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props; //local restructuring helped to shorten next line of code
        //this.props.getUsers(pageNumber, this.props.pageSize);
        this.props.getUsers(pageNumber, pageSize);

        /*this.props.setRequestedPage(pageNumber);
        this.props.toggleIsFetching(true);
        
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items);
        });*/
    }
    //getUsers = () => {};
    render() {

        return <>
            
            { this.props.toggleIsFetching ? <Preloader className={styles.preloader} /> : null}
            <h2 className={styles.pageTitle}>{this.props.pageTitle}</h2>
            <div >
                <UserInfo />
            </div>
            <div className={styles.userInfo}>
            <Users 
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                requestedPage={this.props.requestedPage}
                onPageChanged={this.onPageChanged}
                usersData={this.props.usersData}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                //toggleFollowingProgress={this.props.toggleFollowingProgress}
                followingInProgress={this.props.followingInProgress}

            />
            </div>
            
 
        </>

    }
}

/*let mapStateToProps = (state) => {
    return {
        //UsersPage: state.UsersPage,
        usersData: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        RequestedPage: state.usersPage.RequestedPage,
        toggleIsFetching: state.usersPage.toggleIsFetching,
        followingInProgress: state.usersPage.followingInProgress

    }
}*/

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        usersData: getUsers(state),
        //UsersPage: state.UsersPage,
        //usersData: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        requestedPage: getRequestedPage(state),
        toggleIsFetching: getToggleIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    //withAuthRedirect,   //3 if I don't want this protection, then I just this line
    //TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType >(mapStateToProps, { follow, unfollow, getUsers: getUsersThunkCreator }), //2
    //connect(mapStateToProps, { follow, unfollow, setRequestedPage, toggleFollowingProgress, getUsers: requestUsers })
)(UsersContainer)  //1

//export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

//shorter version:
/*3(2)      export default withAuthRedirect(connect(mapStateToProps, /*{

        follow: followAC,
        unfollow: unfollowAC,
        setUsers: setUsersAC,
        setRequestedPage: setRequestedPageAC,
        setTotalUsersCount: setTotalUsersCountAC,
        toggleIsFetching: toggleIsFetchingAC

    }*/
    //shorter version

/*2 {
     follow, unfollow, setRequestedPage,
     toggleFollowingProgress,
     getUsers: getUsersThunkCreator
 })(UsersContainer));

/*
let mapDispatchToProps = (dispatch) => {
 return {
     follow: (userId) => {
         dispatch(followAC(userId))
     },
     unfollow: (userId) => {
         dispatch(unfollowAC(userId))
     },
     setUsers: (usersData) => {
         dispatch(setUsersAC(usersData))
     },
     setRequestedPage: (pageNumber) => {
         dispatch(setRequestedPageAC(pageNumber))
     },
     setTotalUsersCount: (totalCount) => {
         dispatch(setTotalUsersCountAC(totalCount))
     },
     toggleIsFetching: (isFetching) => {
         dispatch(toggleIsFetchingAC(isFetching))
     }
 }
}
*/