import React from 'react';
import { useHistory } from 'react-router-dom';
import Charts from '../components/Charts';

import API from '../utils/API';
import { Link } from 'react-router-dom';

const members = () => {
    const currentUser = API.getCurrentUser();
    const history = useHistory();

    const logout = () => {
        API.logout();
        history.push('/');
    };

    return (
        <div>
            <h1>Members Page</h1>
            <p>Welcome {currentUser.userName}</p>
            <button onClick={logout}>Log out</button>

            <Charts />
            <Link className="donateBtn" to="/Donations">
                I&apos;m ready to DONATE!
            </Link>
        </div>
    );
};

export default members;
