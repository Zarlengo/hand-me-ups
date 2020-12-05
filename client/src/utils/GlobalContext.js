import React, { createContext } from 'react';
import API from './API';

const GlobalContext = createContext();
const currentUser = API.getCurrentUser();
let userId = 0;
if (currentUser) {
    userId = currentUser.id;
}

const io = require('socket.io-client');
const socket = io({
    withCredentials: true,
    extraHeaders: {
        'hand-me-ups': 'header-content',
        'x-current-user': userId,
    },
});

export const GlobalContextProvider = (props) => {
    return (
        <GlobalContext.Provider
            value={{
                socket,
            }}
        >
            {/* eslint-disable-next-line react/prop-types*/}
            {props.children}
        </GlobalContext.Provider>
    );
};

import PropTypes from 'prop-types';

GlobalContext.propTypes = {
    children: PropTypes.node,
};

export default GlobalContext;
