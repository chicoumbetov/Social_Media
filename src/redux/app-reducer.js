//import { stopSubmit } from "redux-form";
//import { authAPI } from "../api/api";
import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
}
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

//actionCreators. AC abbreviation deleted at the end of words
export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });
//мы диспатчим именно экшны объекты 

//thunkCreator:
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    //dispatch(smth())
    //dispatch(smth())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        })
}

export default appReducer;