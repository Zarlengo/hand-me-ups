import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function TagCheckbox({ tag, id, onClick }) {
    const [isChecked, setisChecked] = useState(false);
    return (
        <div className="tagRow">
            <label className="tagLabel">{tag}:</label>
            <input
                type="checkbox"
                className="tagInput"
                checked={isChecked}
                onChange={(event) => {
                    setisChecked(event.target.checked);
                    onClick(event, id);
                }}
            />
        </div>
    );
}
TagCheckbox.propTypes = {
    tag: PropTypes.string,
    id: PropTypes.number,
    onClick: PropTypes.func,
};
export default TagCheckbox;
