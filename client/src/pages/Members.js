import React from 'react';
import { useHistory } from 'react-router-dom';
import Charts from '../components/Charts';
import API from '../utils/API';

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
            <p>Welcome {currentUser.firstName}</p>
            <button onClick={logout}>Log out</button>
            <Charts />
        </div>
    );
};

export default members;
