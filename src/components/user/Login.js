import { useState } from 'react';
import Layout from '../Layout';

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

    const signInForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email:</label>
                <input name='email' type="email" className="form-control"
                    value={email} required />
            </div>
            <div className="form-group">
                <label className="text-muted">Password:</label>
                <input name="password" type="password" className="form-control"
                    value={password} required />
            </div>
            <button type="submit" className="btn btn-outline-primary" disabled={disabled}>Login</button>
        </form>
    );
    return (
        <Layout title="Login" className="container col-md-8 offset-md-2">
            <h3>Login Here,</h3>
            <hr />
            {signInForm()}
            <hr />
        </Layout>
    );
}

export default Login;