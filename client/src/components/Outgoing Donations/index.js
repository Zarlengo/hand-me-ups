import React, { useState, useEffect } from 'react';
import DonationContext from '../../utils/donationContext';
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

    function changeChosen(id) {
        if (chosenState === false) {
            setChosenState(true);
        }
        API.addDonation({
            sendingParentID: currentUser.id,
            recievingChildID: id,
        })
            .then((response) => {
                return response.data;
            })
            // eslint-disable-next-line no-unused-vars
            .then((data) => {
                setShippingLabel(true);
            });
    }
    const toggleModal = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setShippingLabel(!shippingLabel);
    };

    const currentUser = API.getCurrentUser();
    useEffect(() => {
        API.getChildren(currentUser.id)
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                setLoading(false);
                setResults(data);
            });
    }, []);
    if (loading) {
        return <h1>Loading...</h1>;
    }
    console.log(shippingLabel, 'shippinglabel');
    return (
        <div className="Outgoing">
            {results.map((childObject) => (
                <div className="outgoingCard" key={childObject.id}>
                    <DonationContext.Provider
                        value={{
                            ...childObject,
                            ...currentUser,
                        }}
                    >
                        <DonationDemographics />
                        <ChooseBtn
                            childID={childObject.id}
                            changeChosen={changeChosen}
                        />
                    </DonationContext.Provider>
                </div>
            ))}
            {shippingLabel ? (
                <ShippingLabel
                    // key={currentUser.id}
                    //{...currentUser}
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
