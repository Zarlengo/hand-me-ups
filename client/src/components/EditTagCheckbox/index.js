import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function EditTagCheckbox({ tag, tags, id, icon, Icon, edit, onClick }) {
    const [isChecked, setisChecked] = useState(false);
    const [match, setMatch] = useState(false);

    useEffect(() => {
        if (tags.includes(id)) {
            setMatch(true);
            setisChecked(true);
        }
    }, []);

    const handleClick = (event) => {
        setisChecked(event.target.checked);
        onClick(id);
    };

    return (
        <tr>
            <td>
                <label>{tag}:</label>
            </td>
            <td>{match && !edit ? <Icon icon={icon} /> : ''}</td>

            <td>
                {edit ? (
                    <form>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(event) => handleClick(event)}
                        />
                    </form>
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
    Icon: PropTypes.func,
    edit: PropTypes.bool,
    onClick: PropTypes.func,
};
export default EditTagCheckbox;
