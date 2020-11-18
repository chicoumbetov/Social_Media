import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import  { reducer as formReducer } from 'redux-form';
import appReducer from "./app-reducer";

let reducers = combineReducers({
    profilePage: profileReducer, //same as profilePage: profileReducer,   means there is profilePage and profileReducer is responsible for it
    dialogsPage: dialogsReducer,    //but can't read new shorter format for instant
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer

});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
window.__store__ = store;

//let store = createStore(reducers, applyMiddleware(thunkMiddleware))
export default store;