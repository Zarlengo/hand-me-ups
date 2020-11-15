import React from 'react';
import { Redirect } from 'react-router-dom';

import Login from '../components/Login';

import API from '../utils/API';

function Welcome() {
    if (API.getCurrentUser()) {
        return <Redirect to={'/Members'} />;
    }

    return (
        <div>
            <h1>Welcome Page</h1>
            <Login />
        </div>
    );
}

export default Welcome;
