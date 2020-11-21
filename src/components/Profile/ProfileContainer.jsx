import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from "../../redux/profile-reducer";
import { withRouter } from 'react-router-dom';
//uncomment if I want limit access to profile //import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
//import { usersAPI } from '../../api/api';


class ProfileContainer extends React.Component {

  refreshProfile() {

    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }

    this.props.getUserProfile(userId)
    this.props.getStatus(userId)

  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) // to skip "looping"
      this.refreshProfile();
  }

  render() {
    return (
      <Profile {...this.props}
        isOwner={!this.props.match.params.userId} //!! two signs means that if there is id then I am not owner, I am on someone's page
        //if one ! sign then I am owner, & there is no id.
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
      />
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
})

export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),   //4   //thunks in curly brackets, which helps to give further props.
  withRouter,                                     //3
  //withAuthRedirect                            //2
)(ProfileContainer)                              //1

//2(1)     //let AuthRedirectComponent = withAuthRedirect(ProfileContainer)
//3       //let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
//4       //export default connect(mapStateToProps, { getUserProfile })(WithUrlDataContainerComponent);