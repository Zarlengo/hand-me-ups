import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function MessageLine({ line, author }) {
    let align = { textAlign: 'right' };
    if (line.author === author) {
        align = { textAlign: 'left' };
    }

    return (
        <div className="messageLine" style={align}>
            {line.author}: {line.message}
        </div>
    );
}

MessageLine.propTypes = {
    line: PropTypes.object,
    author: PropTypes.string,
};

export default MessageLine;
