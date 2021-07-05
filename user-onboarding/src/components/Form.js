import React, { useState, useEffect } from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const UserForm = ({values, errors, touched, status}) => {

    const [user,setUser] = useState([]);

    useEffect(() => {
        if (status) {
            setUser([...user, status]);
        }
      }, [status]);

    return (
        <div className='user-form-container'>
            <Form className='user-form'>
                <label className='form-name'>
                <Field 
                    type='text' 
                    name='name' 
                    placeholder='Full Name' 
                />
                {touched.name && errors.name && <p className="error">{errors.name}</p>}
                </label>
                <label className='form-email'>
                <Field 
                    type='text' 
                    name='email' 
                    placeholder='Email' 
                />
                </label>
                <label className='form-password'>
                <Field 
                    type='text' 
                    name='password' 
                    placeholder='Password' 
                />
                {touched.password && errors.password && <p className="error">{errors.password}</p>}
                </label>
                <label className='checkbox-container'>
                    <Field 
                        type='checkbox' 
                        name='tos' 
                        checked={values.tos} 
                    /> 
                        Terms of Service
                </label>
                <button>Submit</button>
            </Form>
            {user.map(item => (
            <div className='returned-data' key={item.id}>
            <p>Name: {item.name}</p>
            <p>Email: {item.email}</p>
            </div>   
            ))}
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
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("This Field is Required"),
        password: Yup.string().required("This Field is Required")
      }),

    handleSubmit(values, { setStatus} ) {
        axios
        .post('https://reqres.in/api/users', values)
        .then (res => {
            setStatus(res.data);
            console.log('Data Returned',res.data);
        })
        .catch(err => console.log('Data was not found',err.res));
    }
    
})(UserForm);

export default FormikUserForm;