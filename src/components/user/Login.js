import { useState } from 'react';
import Layout from '../Layout';
import { showLoading, showError } from '../../utils/message';
import { login } from '../../api/apiAuth';
import { Redirect } from 'react-router-dom';
import { authenticate, isAuthenticated, userInfo } from '../../utils/auth';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: false,
        loading: false,
        disabled: false,
        redirect: false
    });

    const { email, password, loading, error, redirect, disabled } = values;

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
        login({ email, password })
            .then(response => {
                authenticate(response.data.token, () => {
                    setValues({
                        ...values,
                        email: '',
                        password: '',
                        success: true,
                        loading: false,
                        error: false,
                        redirect: true
                    })
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

    const signInForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Email:</label>
                <input name='email' type="email" className="form-control"
                    value={email} required onChange={handleChange} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password:</label>
                <input name="password" type="password" className="form-control"
                    value={password} required onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-outline-primary" disabled={disabled}>Login</button>
        </form>
    );

    const redirectUser = () => {
        if (redirect)
            return <Redirect to={`/${userInfo().role}/dashboard`} />
            
        if (isAuthenticated())
            return <Redirect to='/' />
    }

    return (
        <Layout title="Login" className="container col-md-8 offset-md-2">
            {redirectUser()}
            {showLoading(loading)}
            {showError(error, error)}
            <h3>Login Here,</h3>
            <hr />
            {signInForm()}
            <hr />
        </Layout>
    );
}

export default Login;