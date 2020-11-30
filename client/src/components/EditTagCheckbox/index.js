import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function EditTagCheckbox({ tag, tags, id, onClick, icon, Icon, edit }) {
    const [isChecked, setisChecked] = useState(false);
    const [match, setMatch] = useState(false);

    useEffect(() => {
        if (tags.includes(id)) {
            setMatch(true);
            setisChecked(true);
        }
    }, []);
    return (
        <tr>
            <td>
                <label>{tag}:</label>
            </td>
            <td>{match && !edit ? <Icon icon={icon} /> : ''}</td>

            <td>
                {edit ? (
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(event) => {
                            setisChecked(event.target.checked);
                            onClick(event, id);
                        }}
                    />
                ) : (
                    ''
                )}
            </td>
        </tr>
    );
}
EditTagCheckbox.propTypes = {
    tag: PropTypes.string,
    tags: PropTypes.array,
    id: PropTypes.number,
    icon: PropTypes.object,
    Icon: PropTypes.object,
    edit: PropTypes.bool,
    onClick: PropTypes.func,
};
export default EditTagCheckbox;
