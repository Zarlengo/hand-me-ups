import React from 'react';
import { useAuth } from '../context/auth';

function Members() {
    const { setAuthTokens } = useAuth();

    function logout() {
        setAuthTokens();
    }

    return (
        <div>
            <h1>Members Page</h1>
            <button onClick={logout}>Log out</button>
        </div>
    );
}

export default Members;
