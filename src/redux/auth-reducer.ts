import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";
//import { InitialStateType } from './app-reducer';

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';
/*
    first method: define type
export type InitialStateType2 = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: Boolean,
    captchaUrl: string | null
} 
*/
//let initialState: InitialStateType = {

let initialState= {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null  // if null, then captcha is not required
    //isFetching: true
} 

//second method: get type that is defined "itself"
export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
                //isAuth: true //should be deleted since in payload 
            }

        default:
            return state;
    }
}

type SetAuthUserDataActionPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

type SetAuthUserDataActionType = { 
    type: typeof SET_USER_DATA, //value of it, not type
    payload: SetAuthUserDataActionPayloadType
}

//actionCreators. AC abbreviation deleted at the end of words
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } });

type GetCaptchaUrlSuccessActionType = { 
    type: typeof GET_CAPTCHA_URL_SUCCESS, 
    payload: { captchaUrl: string } 
}

//мы диспатчим именно экшны объекты
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } });

//thunkCreator:
export const getAuthUserData = () => async (dispatch: any) => {
    let response = await authAPI.me()
    //.then(response => {
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
    //})
}

//thunkCreator to login from site not from server site
export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {

    let response = await authAPI.login(email, password, rememberMe, captcha)
    //.then(response => {
    if (response.data.resultCode === 0) {
        // success, get auth data
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", { _error: message }));
    }
    //})
}

//thunkCreator
export const getCaptchaUrl = () => async (dispatch: any) => {

    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;