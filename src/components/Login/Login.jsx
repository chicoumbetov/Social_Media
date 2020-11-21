import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
//import LoginForm from './LoginForm';
import { login } from "../../redux/auth-reducer";

//import { Field } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { Input } from '../common/FormsControls/FormsControls';
import { Redirect } from 'react-router-dom';
import style from "../common/FormsControls/FormsControls.module.css";
import { createField } from '../../utils/Login-refactoring-helper';

const LoginForm = ({ handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit} >

            {createField("Email", "email", [required], Input)}
            {createField("Password", "password", [required], Input, { type: "password" } ) }
            {createField(null, "rememberMe", [], Input, { type: "checkbox" }, "remember me")}

            { error && <div className={style.formSummaryError}>
                {error}
            </div>
            }

            <div>
                <button>Login</button>
            </div>
        </form>)
}

//unique name for form
const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe); //callback login
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
//thunkCreator login
export default connect(mapStateToProps, { login })(Login);