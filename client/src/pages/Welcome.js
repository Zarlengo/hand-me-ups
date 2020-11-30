import React from 'react';
import { Redirect } from 'react-router-dom';
import './styles.css';

import Login from '../components/Login';

import API from '../utils/API';

function Welcome() {
    if (API.getCurrentUser()) {
        return <Redirect to={'/Members'} />;
    }

    return (
        <div className="wrapper">
            <div className="header"> Hand Me Ups </div>
            <div id="picture"></div>
            <div id="background"></div>

            <Login />
        </div>
    );
}

export default Welcome;
