import React, { useState, createContext } from 'react';

const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
    const [shipNotifications, setShipNotifications] = useState(0);

    return (
        <GlobalContext.Provider
            value={{
                shipNotifications,
                setShipNotifications,
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
