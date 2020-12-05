import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../../utils/GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';
import API from '../../utils/API';

import './style.css';

function Notification() {
    const [shipNotifications, setShipNotifications] = useState(0);
    const { socket } = useContext(GlobalContext);

    useEffect(() => {
        document.title = `${shipNotifications} new package coming`;
    }, [shipNotifications]);

    const handleMouseClick = (event) => {
        event.preventDefault();
        setShipNotifications(0);
    };

    useEffect(() => {
        API.getShipments().then((response) => {
            setShipNotifications(response.length);
        });
    }, []);

    useEffect(() => {
        socket.on('package', () => {
            setShipNotifications(shipNotifications + 1);
        });
    });

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

export default Notification;
