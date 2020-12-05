import React from 'react';
import Charts from '../components/Charts';
import GoogleMaps from '../components/googleMaps';

import API from '../utils/API';
import { Link } from 'react-router-dom';

const members = () => {
    const currentUser = API.getCurrentUser();

    return (
        <div className="loggedInDiv bubbles">
            <div className="bubble b1"></div>
            <div className="bubble b2"></div>
            <div className="bubble b3"></div>
            <div className="bubble b4"></div>
            <div className="bubble b5"></div>
            <div className="bubble b6"></div>
            <div className="bubble b7"></div>
            <div className="members">
                <div className="welcome">
                    <h1>Members Page</h1>
                    <p>Welcome {currentUser.firstName}</p>
                </div>
                <Charts />
                <div className="donateBtn">
                    <Link to="/Members/Donations">I&apos;m ready to DONATE!</Link>
                </div>
                <div className="seeWhere">
                    <p>See where other Hand-Me-Ups members are from</p>
                </div>
                <GoogleMaps />
            </div>
        </div>
    );
};

export default members;
