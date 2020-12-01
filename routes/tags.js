module.exports = (db) => {
    const router = require('express').Router();
    const cryptographic = require('./cryptographic');

    router.get('/:id', (req, res) => {
        db.User.findByPk(req.params.id)
            .then((response) => {
                const answer = cryptographic(
                    req.headers['x-access-token'],
                    response.accessToken
                );
                if (!answer) {
                    res.status(401).json({ message: 'invalid credentials' });
                } else {
                    db.Tag.findAll({})
                        .then((response) => {
                            res.json(response);
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json(err);
                        });
                }
            })
            .catch((err) => res.status(400).json(err));
    });

    return router;
};
