import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import './style.css';

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Login() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    function postLogin() {
        axios
            .post('/api/login', {
                userName,
                password,
            })
            .then((result) => {
                if (result.status === 200) {
                    setLoggedIn(true);
                } else {
                    setIsError(true);
                }
            })
            .catch(() => {
                setIsError(true);
            });
    }

    if (isLoggedIn) {
        return <Redirect to="/Members" />;
    }

    return (
        <form className="login-form">
            <h2>Welcome back</h2>
            <div className="login-row">
                <label type="text" name="userName">
                    Username
                </label>
                <br></br>
                <input
                    className="input-field"
                    type="userName"
                    id="userName"
                    name="userName"
                    placeholder="Username"
                    value={userName}
                    onChange={(event) => {
                        setUserName(event.target.value);
                    }}
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
                    placeholder="Password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
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
                <button className="sign-in-btn" onClick={postLogin}>
                    Sign In
                </button>
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
                {isError && (
                    <div className="error">
                        The username or password provided did not match.
                    </div>
                )}
            </div>
        </form>
    );
}

export default Login;
