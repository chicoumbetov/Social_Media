import React from 'react';
import { Field } from 'redux-form';

export const createField = (placeholder, name, validators, component, props = {}, text = "") => (
    <div>
        <Field placeholder={placeholder} name={name}
            validate={validators} component={component} 
            {...props}
            /> {text}
    </div>
)