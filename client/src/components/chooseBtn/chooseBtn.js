import React from 'react';
import './chooseBtn.css';
import PropTypes from 'prop-types';
function ChooseBtn({ changeChosen, childID }) {
    return (
        <button onClick={() => changeChosen(childID)} className={'square_btn'}>
            <i className="fa fa-chevron-right"></i>
            Choose this Donation
        </button>
    );
}
ChooseBtn.propTypes = {
    changeChosen: PropTypes.func,
    childID: PropTypes.number,
};
export default ChooseBtn;
