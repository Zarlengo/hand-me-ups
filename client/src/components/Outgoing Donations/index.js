import React, { useState, useEffect } from 'react';
import DonationDemographics from '../DonationDemographics/domationDemographics';
import './outgoing.css';
import ChooseBtn from '../chooseBtn/chooseBtn';
import API from '../../utils/API';
import ShippingLabel from '../ShippingLabel';

export const Outgoing = () => {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [chosenState, setChosenState] = useState(false);
    const [shippingLabel, setShippingLabel] = useState(false);

    function changeChosen(receivingChildID) {
        if (chosenState === false) {
            setChosenState(true);
        }
        const userData = { receivingChildID, sendingParentID: currentUser.id };
        API.addDonation(userData)
            .then((response) => {
                return response.data;
            })
            .then(() => {
                setShippingLabel(true);
            });
    }
    const toggleModal = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setShippingLabel(!shippingLabel);
    };
    useEffect(() => {
        if (shippingLabel === true) {
            const confirm = window.confirm('Press ok to print');
            if (confirm) {
                window.print();
            } else {
                window.location.reload();
            }
        }
    }, [shippingLabel]);

    const currentUser = API.getCurrentUser();
    useEffect(() => {
        API.getChildren().then((data) => {
            setLoading(false);
            setResults(data);
        });
    }, []);
    if (loading) {
        return <h1>Loading...</h1>;
    }
    return (
        <div className="Outgoing">
            {results.map((childObject) => (
                <div className="outgoingCard" key={childObject.id}>
                    <DonationDemographics child={childObject} />
                    <ChooseBtn
                        childID={childObject.id}
                        changeChosen={changeChosen}
                    />
                </div>
            ))}
            {shippingLabel ? (
                <ShippingLabel
                    parentFName={currentUser.firstName}
                    parentLName={currentUser.lastName}
                    parentAddy1={currentUser.address1}
                    parentCity={currentUser.city}
                    parentState={currentUser.state}
                    parentZip={currentUser.zipCode}
                    parentID={currentUser.id}
                    toggleModal={toggleModal}
                />
            ) : (
                <> </>
            )}
            ;
        </div>
    );
};
export default Outgoing;
