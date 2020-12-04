import React from 'react';
import PropTypes from 'prop-types';

const Tags = ({ tag, className }) => {
    return (
        <ul className={className}>
            {tag.map((m) => (
                <li key={m.tag}>{m.tag}</li>
            ))}
        </ul>
    );
};

Tags.propTypes = {
    tag: PropTypes.object,
    className: PropTypes.string,
};

export default Tags;
