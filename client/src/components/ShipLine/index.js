import React from 'react';
import PropTypes from 'prop-types';

function ShipLine({ shipment }) {
    return <div>{shipment.trackingNumber}</div>;
}

ShipLine.propTypes = {
    shipment: PropTypes.object,
};

export default ShipLine;
