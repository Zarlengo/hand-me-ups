import React from 'react';
import Charts from '../components/Charts';
import './memberStyle.css';

import API from '../utils/API';
import { Link } from 'react-router-dom';

const members = () => {
    const currentUser = API.getCurrentUser();

    return (
        <div className="loggedInDiv">
            <div className="members">
                <h1>Members Page</h1>
                <p>Welcome {currentUser.firstName}</p>
                <Charts />
                <Link className="donateBtn" to="/Donations">
                    I&apos;m ready to DONATE!
                </Link>
            </div>
        </div>
    );
};

export default members;
