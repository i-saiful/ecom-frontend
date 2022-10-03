import { useState, useEffect } from 'react';
import Layout from '../Layout';
import { showLoading, showError } from '../../utils/message';
import { login } from '../../api/apiAuth';
import { Redirect } from 'react-router-dom';
import { authenticate, isAuthenticated, userInfo } from '../../utils/auth';
import {API} from '../../utils/config'

const Login = (props) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: false,
        loading: false,
        disabled: false,
        redirect: false
    });

    useEffect(() => {
        if (props.location.search) {
            const { token } = JSON.parse(decodeURI(props.location.search).slice(1))
            if (token) {
                authenticate(token, () => {
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
            }
        }
        // eslint-disable-next-line
    }, [])
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

    const handleSignIn = e => {
        window.open(`${API}/auth/${e}`, '_self')
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
            <button className='btn btn-outline-primary'
                onClick={() => handleSignIn('google')}>
                <i className="bi bi-google mr-2"></i>Login with Google</button>
            <button className='btn btn-outline-primary mx-4'
                onClick={() => handleSignIn('facebook')}>
                <i className="bi bi-facebook mr-2"></i>Login with Facebook</button>
        </Layout>
    );
}

export default Login;