import React from 'react';
import { compose } from 'redux';
import { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/app-reducer';

import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';
import { withSuspense } from './hoc/withSuspense';

//import ProfileContainer from './components/Profile/ProfileContainer';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
//import DialogsContainer from './components/Dialogs/DialogsContainer';
//import Dialogs from './components/Dialogs/Dialogs';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));


class App extends Component {

  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    //if (reason, promise) then should use thunk
    alert(promiseRejectionEvent)
    //console.error(promiseRejectionEvent)
  }

  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />

        <div className="app-wrapper-content">
          <Switch>
            <Redirect exact from="/" to="/profile" render={withSuspense(ProfileContainer)}/>
            {/* Variant Dimych: <Route exact path='/' render={ () => <Redirect to={"/profile"}/>}/>      */}
            <Route path='/profile/:userId?'
              render={withSuspense(ProfileContainer)}
            />

            <Route path='/dialogs'
              render={withSuspense(DialogsContainer)}
            />

            <Route path='/news' render={() => <News />} />
            <Route path='/music' component={Music} />
            <Route path='/users' render={() => <UsersContainer />} />
            <Route path='/settings' component={Settings} />
            <Route path='/login' render={() => <LoginPage />} />
            <Route path='*' render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

//export default compose(
let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App)

const SamuraiJSAp = (props) => {
  return <BrowserRouter >
    {/*no need in HashRouter: basename={process.env.PUBLIC_URL}*/}
    <Provider store={store} >
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default SamuraiJSAp;



//store={props.store} don't need since we can pass by StoreContext API instead of props.
          //profilePage = {props.state.profilePage}
          //dispatch = {props.dispatch}

//updateNewPostText={props.updateNewPostText} now is in dispatch together with  addPost

//we don't need : state=props.state.dialogsPage since we have store.

//store={props.store}
          //dialogsPage = {props.state.dialogsPage}
          //dispatch = {props.dispatch} 

/* <Route path='/profile' component={Profile} />
          <Route path='/dialogs' component={Dialogs} /> */