import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import AddMessageForm from './AddMessageForm/AddMessageForm';
import d from './Dialogs.module.css';
//import {sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/dialogs-reducer';

const Message = (props) => {
    return (
        <div className={d.message}>{props.message}</div>
    )
}

const DialogItem = (props) => {

    let path = '/dialogs/' + props.id;

    return (<div className={d.dialog + ' ' + d.active}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>)
}
//oldArray
const Dialogs = (props) => {
    // we can getState dialogsPage from store which is in props that came from  tag Dialogs in App.js
    //let state = props.store.getState().dialogsPage;
    let state = props.dialogsPage;

    //from dialogsData old array of object we are mapping newArray dialogsElements
    //newArray will have as much elements as objects quantity
    let dialogsElements = state.dialogsData.map(idNameDialog => (<DialogItem name={idNameDialog.name} id={idNameDialog.id} />))
    //oldArray messageData
    //newArray
    let messageElements = state.messageData.map(idNameMessage => (<Message message={idNameMessage.message} id={idNameMessage.id} />))
    //let newMessageBody = state.newMessageBody;

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
        //props.store.dispatch (sendMessageCreator());  
    }

    if (!props.isAuth) return <Redirect to={"/login"} />

    return (<div className={d.dialogs}>

        <div className={d.dialogsItems}>{dialogsElements}</div>
        <div className={d.messages}>
            <div> {messageElements} </div>
            <AddMessageForm onSubmit={addNewMessage} />
        </div>
    </div>)
}



export default Dialogs;

//textarea value={newMessageBody} onChange={onNewMessageChange}placeholder='Enter your message' >textarea
/*
*/