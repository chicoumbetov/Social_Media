//import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
//import { Redirect } from 'react-router-dom';
// limit access by loginin :   import { withAuthRedirect } from '../../hoc/withAuthRedirect';
//import d from './Dialogs.module.css';
import { sendMessageCreator } from '../../redux/dialogs-reducer';
//import store from '../../redux/redux-store';
//import StoreContext from '../../StoreContext';
import Dialogs from './Dialogs';

//oldArray DialogsContainer in DialogsContainerElement was replace by SuperDialogsContainer

let mapStateToProps = (state) => {

    return {
        //a=1       b=2
        dialogsPage: state.dialogsPage,

    }
}
let mapDispatchToProps = (dispatch) => {
    //mapDispatchToProps = mapping(putting, turning into) of callbacks to props
    return {
        //c=3
        //these 2 callbacks will be stored in props
        //updateNewMessageBody: (body) => {dispatch(updateNewMessageBodyCreator(body));},
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody));
        }
    }
}
//compose put 3 in 2. then 2 in 1.
export default compose(
    connect(mapStateToProps, mapDispatchToProps),   //1
    //withAuthRedirect                                //2
) (Dialogs)                                         //3

//2//this line is also in compose//let AuthRedirectComponent = withAuthRedirect(Dialogs)
/*
(props) => {
if (!this.props.isAuth) return <Redirect to="/login" />
return <Dialogs {...props} />
}*/

//copy of DialogsContainer which is SuperDialogsContainer but renamed back to DialogsContainer name by using  react-reduxlibrary
//1                 // now this line is in compose//let DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent); //in props of Dialogs will be a, b ,c .
//connect returns new Container Component(DialogsContainer) by using 2 callbacks in first bracket
//мы говорим Dialogs перерисуйся если на строке 16 dialogsPage будет иной
//export default DialogsContainer; 