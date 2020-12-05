import React from 'react';
import Members from '../components/Members';
import Bubbles from '../components/Bubbles';

const members = () => {
    return (
        <div className="loggedInDiv">
            <Bubbles />
            <Members />
        </div>
    );
};

export default members;
