import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Login() {
    return (
        <form className="login-form">
            <h2>Welcome back</h2>
            <div className="login-row">
                <label type="text" name="email">
                    Email
                </label>
                <br></br>
                <input
                    className="input-field"
                    type="text"
                    id="email"
                    name="email"
                    value="Email"
                />
            </div>
            <br></br>
            <div className="login-row">
                <label type="text" name="password">
                    Password
                </label>
                <br></br>
                <input
                    className="input-field"
                    type="password"
                    id="password"
                    name="password"
                    value="Password"
                />
            </div>
            <br></br>
            <div className="login-row">
                <input
                    type="checkbox"
                    id="remember-me"
                    name="remember-me"
                    value="false"
                />
                <label type="text" name="remember-me">
                    &nbsp;Remember Me
                </label>
            </div>
            <br></br>
            <div className="login-row">
                <button className="sign-in-btn">Sign In</button>
            </div>
            <br></br>
            <div className="login-row">
                <Link className="forgot" to="/forgot">
                    Forgot password?&nbsp;
                    <i className="fas fa-angle-right" aria-hidden="true"></i>
                </Link>
            </div>
            <div className="login-row">
                <Link className="forgot" to="/signup">
                    Not a member? Sign up now.&nbsp;
                    <i className="fas fa-angle-right" aria-hidden="true"></i>
                </Link>
            </div>
        </form>
    );
}

export default Login;
