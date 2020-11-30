import React from 'react';
import './chooseBtn.css';
import PropTypes from 'prop-types';
function ChooseBtn({ changeChosen, childID }) {
    console.log(childID, 'childID');
    return (
        <button onClick={() => changeChosen(childID)} className={'card-btn'}>
            Choose this Donation
        </button>
    );
}
ChooseBtn.propTypes = {
    changeChosen: PropTypes.func,
    childID: PropTypes.number,
};
export default ChooseBtn;
