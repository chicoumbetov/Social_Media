import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
    //isFetching: true
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                //isAuth: true //should be deleted since in payload

            }
        default:
            return state;
    }
}

//actionCreators. AC abbreviation deleted at the end of words
export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } });
//мы диспатчим именно экшны объекты

//thunkCreator:
export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me()
    //.then(response => {
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
    //})
}

//thunkCreator to login from site not from server site
export const login = (email, password, rememberMe) => async (dispatch) => {

    let response = await authAPI.login(email, password, rememberMe)
    //.then(response => {
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", { _error: message }));
    }
    //})
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
    
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;