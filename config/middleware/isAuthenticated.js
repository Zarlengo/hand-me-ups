// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function (db) {
    return function (req, res, next) {
        const cryptographic = require('../cryptographic');
        if (!req.headers['x-user-id'] || !req.headers['x-access-token']) {
            return res.status(401).json('Invalid Headers');
        }

        db.User.findByPk(req.headers['x-user-id'])
            .then((response) => {
                const answer = cryptographic(
                    req.headers['x-access-token'],
                    response.accessToken
                );
                // If the user is logged in, continue with the request to the restricted route
                if (
                    process.env.NODE_ENV === 'production' &&
                    req.user &&
                    answer
                ) {
                    return next();
                }
                // If the user is logged in, continue with the request to the restricted route
                if (process.env.NODE_ENV !== 'production' && answer) {
                    return next();
                }
                // If the user isn't logged in, redirect them to the login page
                res.redirect(403, '/');
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    };
};
