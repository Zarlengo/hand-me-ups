import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Tags = ({ tag, className }) => {
    return (
        <ul className={className + ' no-list'}>
            {tag.map((m) => (
                <li key={m.tag}>{m.tag}</li>
            ))}
        </ul>
    );
};

Tags.propTypes = {
    tag: PropTypes.array,
    className: PropTypes.string,
};

export default Tags;
