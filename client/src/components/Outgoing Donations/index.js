import React, { useState, useEffect } from 'react';
import DonationContext from '../../utils/donationContext';
import DonationDemographics from '../DonationDemographics/domationDemographics';
import './outgoing.css';
import ChooseBtn from '../chooseBtn/chooseBtn';

export const Outgoing = () => {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [chosenState, setChosenState] = useState(false);

    function changeChosen() {
        if (chosenState === false) {
            setChosenState(true);
        }
    }

    useEffect((parentId) => {
        fetch(`./api/child/${parentId}`)
            .then((response) => {
                console.log(response, 'response');
                return response.json();
            })
            .then((json) => {
                setLoading(false);
                setResults(json.data);
            });
    }, []);
    if (loading) {
        return <h1>Loading...</h1>;
    }
    if (chosenState) {
        return <div />;
    }
    return (
        <div className="Outgoing">
            <DonationContext.Provider value={results}>
                <DonationDemographics />
                <ChooseBtn
                    style={{ opacity: image ? 1 : 0 }}
                    changeChosen={changeChosen}
                />
            </DonationContext.Provider>
        </div>
    );
};
export default Outgoing;
