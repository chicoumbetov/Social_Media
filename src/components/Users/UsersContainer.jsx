import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, setRequestedPage, toggleFollowingProgress, getUsersThunkCreator } from "../../redux/users-reducer";
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

class UsersContainer extends React.Component {

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

    onPageChanged = (pageNumber) => {
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

            <div>
                <UserInfo />
            </div>

            <Users totalItemsCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                requestedPage={this.props.requestedPage}
                onPageChanged={this.onPageChanged}
                usersData={this.props.usersData}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                //toggleFollowingProgress={this.props.toggleFollowingProgress}
                followingInProgress={this.props.followingInProgress}

            />

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

let mapStateToProps = (state) => {
    return {
        usersData: getUsers(state),
        //UsersPage: state.UsersPage,
        //usersData: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalUsersCount(state),
        requestedPage: getRequestedPage(state),
        toggleIsFetching: getToggleIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    //withAuthRedirect,   //3 if I don't want this protection, then I just this line
    connect(mapStateToProps, { follow, unfollow, setRequestedPage, toggleFollowingProgress, getUsers: getUsersThunkCreator }), //2
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