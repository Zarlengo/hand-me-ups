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
        <div className="container">
            <div className="header">
                <h1>Hand-Me-Ups</h1>
            </div>
            <div id="lego"></div>
            <div id="grid-one"></div>
            <div id="grid-two"></div>
            <div id="grid-three"></div>
            <div id="grid-four"></div>
            <div id="grid-four"></div>

            <Login />
        </div>
    );
}

export default Welcome;
