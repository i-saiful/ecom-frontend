import { useState } from 'react';
import Layout from '../Layout';
import { showLoding, showError } from '../../utils/message';
import { register } from '../../api/apiAuth';
import { Link } from 'react-router-dom';

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        loading: false,
        disabled: false,
        success: false
    });

    const { name, email, password, success, error, loading, disabled } = values;

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            error: false
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setValues({
            ...values,
            error: false,
            loading: true,
            disabled: true
        })
        register({ name, email, password })
            .then(response => {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    success: true,
                    loading: false,
                    error: false
                })
            })
            .catch(err => {
                let errMsg = ''
                if (err.response) {
                    errMsg = err.response.data
                } else {
                    errMsg = "Somthing went wrong!"
                }
                setValues({
                    ...values,
                    error: errMsg,
                    disabled: false,
                    loading: false
                })
            })
    }

    const signUpForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name:</label>
                <input type="text" name="name" className="form-control"
                    value={name} required onChange={handleChange} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email:</label>
                <input type="email" name="email" className="form-control"
                    value={email} required onChange={handleChange} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password:</label>
                <input type="password" name="password" className="form-control"
                    value={password} required onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary"
                disabled={disabled}>Create Account</button>
        </form>
    );

    const showSuccess = () => {
        if(success)
        return (
            <div className='alert alert-primary'>
                New account created. Please <Link to='/login'>login</Link>
            </div>
        )
    }

    return (
        <Layout title="Register" className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showLoding(loading)}
            {showError(error, error)}
            <h3>Register Here,</h3>
            <hr />
            {signUpForm()}
            <hr />
        </Layout>
    );
}

export default Register;