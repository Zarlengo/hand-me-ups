import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
function ChooseBtn({ changeChosen, childID, ParentId }) {
    return (
        <button
            onClick={() => changeChosen(childID, ParentId)}
            className={'square_btn'}
        >
            <i className="fa fa-chevron-right"></i>
            Choose this Donation
        </button>
    );
}
ChooseBtn.propTypes = {
    changeChosen: PropTypes.func,
    childID: PropTypes.number,
    ParentId: PropTypes.number,
};
export default ChooseBtn;
