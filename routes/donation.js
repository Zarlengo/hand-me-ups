module.exports = (db) => {
    const router = require('express').Router();
    const cryptographic = require('./cryptographic');

    router.post('/create/:id', (req, res) => {
        db.User.findByPk(req.params.id).then((response) => {
            const answer = cryptographic(
                req.headers['x-access-token'],
                response.accessToken
            );
            if (!answer) {
                res.status(401).json({ message: 'invalid credentials' });
            } else {
                // Need to find if there's a duplicate email in db
                db.Donation.create(req.body).then((dbPost) => {
                    res.json(dbPost);
                });
            }
        });
    });
    return router;
};
