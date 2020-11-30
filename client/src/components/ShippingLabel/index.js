import React from 'react';

// import DonationContext from '../../utils/donationContext';
// import ToyTags from '../toyTags/toyTags';
// import ClothesTags from '../clothesTags/clothesTags';
// import FurnitureTags from '../furnitureTags/furnitureTags';
import PropTypes from 'prop-types';
import './style.css';
const Barcode = require('react-barcode');
function ShippingLabel({
    parentFName,
    parentLName,
    parentID,
    parentAddy1,
    parentCity,
    parentState,
    parentZip,
    toggleModal,
}) {
    const barcodeString = `${parentFName}${parentLName}${parentID}`;
    return (
        <div id="container" onClick={(event) => toggleModal(event)}>
            <div className="ShippingLabel">
                <div onClick={(event) => toggleModal(event)}>X</div>
                <h3>
                    Please detach this half of the page and place inside your
                    package
                </h3>
                <Barcode value={barcodeString} />
                <p>
                    -----------------------------------------------------------------------------------------
                </p>
                <div className="returnAddy">
                    <p>{`${parentFName} ${parentLName}`}</p>
                    <p>{`${parentAddy1} ${parentCity}, ${parentState} ${parentZip}`}</p>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div className="address">
                    <h3>Hand-Me-Ups LLC</h3>
                    <h4>1234 Donation Lane</h4>
                    <h4>Lynnburn Issaqualmie, WA 98123</h4>
                    <Barcode value="HandMeUpsLLC" />
                </div>
            </div>
        </div>
    );
}
ShippingLabel.propTypes = {
    parentFName: PropTypes.string,
    parentLName: PropTypes.string,
    parentAddy1: PropTypes.string,
    parentCity: PropTypes.string,
    parentState: PropTypes.string,
    parentZip: PropTypes.string,
    parentID: PropTypes.number,
    toggleModal: PropTypes.func,
};

export default ShippingLabel;
