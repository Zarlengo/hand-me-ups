import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../../utils/GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';
import API from '../../utils/API';
import ShipLine from '../ShipLine';

import './style.css';

function Notification() {
    const [shipNotifications, setShipNotifications] = useState(0);
    const [shipments, setShipments] = useState([]);
    const [showShipments, setShowShipments] = useState(false);
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
            setShipments(response);
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
                onMouseOver={() => setShowShipments(true)}
                onMouseOut={() => setShowShipments(false)}
            >
                <FontAwesomeIcon icon={faMailBulk} />
                {shipNotifications > 0 ? (
                    <span className="badge">{shipNotifications}</span>
                ) : (
                    ''
                )}
                {showShipments ? (
                    <div
                        className="ship-popup"
                        onMouseOver={() => setShowShipments(true)}
                        onMouseOut={() => setShowShipments(false)}
                    >
                        <h4>Inbound Tracking Numbers:</h4>
                        <div className="ship-area">
                            {shipments.map((shipment, index) => (
                                <ShipLine key={index} shipment={shipment} />
                            ))}
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </React.Fragment>
    );
}

export default Notification;
