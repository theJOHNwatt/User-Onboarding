import React from 'react';
import {withFormik, Form, Field} from 'formik';


const UserForm = ({values}) => {


    return (
        <div className='user-form'>
            <Form>
                <Field type='text' name='name' placeholder='Full Name' />
                <Field type='text' name='email' placeholder='Email' />
                <Field type='text' name='password' placeholder='Password' />
                <label classeName='checkbox-container'>
                <Field type='checkbox' name='tos' checked={values.tos} /> 
                Terms of Service
                </label>
                <button>Submit</button>
            </Form>
        </div>
    )
}

const FormikUserForm = withFormik ({
    mapPropsToValues({name, email, password, tos}) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false
        }
    }
})(UserForm);

export default FormikUserForm;