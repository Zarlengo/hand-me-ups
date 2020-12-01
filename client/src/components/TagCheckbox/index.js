import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TagCheckbox({ tag, id, onClick }) {
    const [isChecked, setisChecked] = useState(false);
    return (
        <div>
            <label>{tag}:</label>
            <input
                type="checkbox"
                value={isChecked}
                onChange={(event) => {
                    setisChecked(event.target.value);
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
