import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import DonationDemographics from '../DonationDemographics';
import GlobalContext from '../../utils/GlobalContext';
import './style.css';
import ChooseBtn from '../chooseBtn';
import API from '../../utils/API';
import ShippingLabel from '../ShippingLabel';

export const Outgoing = () => {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [chosenState, setChosenState] = useState(false);
    const [shippingLabel, setShippingLabel] = useState(false);
    const { socket } = useContext(GlobalContext);

    function changeChosen(receivingChildID, receivingParentID) {
        if (chosenState === false) {
            setChosenState(true);
        }
        const userData = {
            receivingChildID,
            receivingParentID,
            sendingParentID: currentUser.id,
        };
        API.addDonation(userData).then(() => {
            setShippingLabel(true);
            socket.emit('package', {
                author: currentUser.firstName,
                to: receivingParentID,
            });
        });
    }

    const closeModal = (event) => {
        event.preventDefault();
        event.stopPropagation();
        window.location.reload();
    };

    const customStyles = {
        content: {
            top: '200px',
            left: 'auto',
            right: 'auto',
            bottom: 'auto',
        },
    };

    const currentUser = API.getCurrentUser();
    useEffect(() => {
        Modal.setAppElement('body');
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
                        ParentId={childObject.ParentId}
                        changeChosen={changeChosen}
                    />
                </div>
            ))}
            {shippingLabel ? (
                <Modal
                    style={customStyles}
                    isOpen={shippingLabel}
                    onRequestClose={closeModal}
                    contentLabel="Filter"
                    id="filterModal"
                >
                    <ShippingLabel
                        parentFName={currentUser.firstName}
                        parentLName={currentUser.lastName}
                        parentAddy1={currentUser.address1}
                        parentCity={currentUser.city}
                        parentState={currentUser.state}
                        parentZip={currentUser.zipCode}
                        parentID={currentUser.id}
                        closeModal={closeModal}
                    />
                </Modal>
            ) : (
                <> </>
            )}
        </div>
    );
};
export default Outgoing;
