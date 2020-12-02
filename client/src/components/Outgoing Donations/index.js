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
        console.log(id, 'id');
        if (chosenState === false) {
            setChosenState(true);
        }
        API.addDonation({
            receivingChildID: id,
        }).then((data) => {
            console.log(data, 'data');
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
                <DonationContext.Provider
                    key={childObject.id}
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
