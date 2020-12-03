export default () => {
    const crypto = require('crypto');
    const user = JSON.parse(localStorage.getItem('user'));

    const localToken = crypto
        .createHmac('sha256', user.accessToken)
        .update(document.location.host)
        .digest('hex');

    if (user && user.accessToken && localToken) {
        return {
            'x-access-token': localToken,
            'content-type': 'application/json',
        };
    }
    return {};
};
