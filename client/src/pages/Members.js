import React from 'react';
import { useAuth } from '../context/auth';
import Charts from '../components/Charts';

function Members() {
    const { setAuthTokens } = useAuth();

    function logout() {
        setAuthTokens();
    }

    return (
        <div>
            <h1>Members Page</h1>
            <button onClick={logout}>Log out</button>
            <Charts />
        </div>
    );
}

export default Members;
