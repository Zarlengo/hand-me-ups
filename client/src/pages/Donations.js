import React from 'react';

import Outgoing from '../components/Outgoing Donations';
import './donationStyle.css';

function Donations() {
    return (
        <div className="grid loggedInDiv">
            <h1>Donations</h1>
            <Outgoing />
        </div>
    );
}

export default Donations;
