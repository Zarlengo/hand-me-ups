import React from 'react';
import Charts from '../Charts';
import GoogleMaps from '../googleMaps';
import './style.css';

import API from '../../utils/API';
import { Link } from 'react-router-dom';

const Members = () => {
    const currentUser = API.getCurrentUser();

    return (
        <div className="members bubbles">
            <div className="welcome">
                <h1>Members Page</h1>
                <p>Welcome {currentUser.firstName}</p>
            </div>
            <div className="flexRow flexAround">
                <Charts />
                <div className="donateBtn">
                    <Link to="/Members/Donations">
                        I&apos;m ready to DONATE!
                    </Link>
                </div>
            </div>
            <div>
                <div className="seeWhere">
                    <p>See where other Hand-Me-Ups members are from</p>
                </div>
            </div>
            <GoogleMaps />
        </div>
    );
};

export default Members;
