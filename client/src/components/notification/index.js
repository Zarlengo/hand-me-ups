import React, { useContext, useEffect } from 'react';
import GlobalContext from '../../utils/GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';

import './style.css';

const io = require('socket.io-client');
const socket = io({
    withCredentials: true,
    extraHeaders: {
        'hand-me-ups-header': 'header-content',
    },
});

function Notification() {
    const { shipNotifications, setShipNotifications } = useContext(
        GlobalContext
    );

    useEffect(() => {
        socket.on('package', () => {
            setShipNotifications(shipNotifications + 1);
        });
    });

    useEffect(() => {
        document.title = `${shipNotifications} new package coming`;
    }, [shipNotifications]);

    const handleMouseClick = (event) => {
        event.preventDefault();
        setShipNotifications(0);
    };

    return (
        <React.Fragment>
            <div
                className="notification"
                onClick={(event) => handleMouseClick(event)}
            >
                <FontAwesomeIcon icon={faMailBulk} />
                {shipNotifications > 0 ? (
                    <span className="badge">{shipNotifications}</span>
                ) : (
                    ''
                )}
            </div>
        </React.Fragment>
    );
}

export const handleNewMessage = (method, book) => {
    socket.emit('package', {
        method,
        book,
    });
};

export default Notification;
