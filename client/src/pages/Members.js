import React from 'react';
import Charts from '../components/Charts';
import Outgoing from '../components/Outgoing Donations';
function Members() {
    return (
        <div>
            <h1>Members Page</h1>
            <h2>Available Donation Children</h2>
            <Outgoing />
            <Charts />
        </div>
    );
}

export default Members;
