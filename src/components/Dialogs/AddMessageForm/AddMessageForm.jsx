//import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';
import './AddMessageForm.css'

const maxLengthCreator50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} validate={[required, maxLengthCreator50]}
                name="newMessageBody" placeholder='Enter your message' />
            </div>
            <div  ><button className="sendbutton" >Send</button></div>
        </form>
    )
}

export default reduxForm({ form: "dialogAddMessageForm" })(AddMessageForm)
//const AddMessageFormRedux = 