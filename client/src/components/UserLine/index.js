import React from 'react';
import PropTypes from 'prop-types';

function UserLine({ user }) {
    return <div>{user.Parent.firstName}</div>;
}

UserLine.propTypes = {
    user: PropTypes.object,
};

export default UserLine;
