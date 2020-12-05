module.exports = (db) => {
    const router = require('express').Router();
    const isAuthenticated = require('../config/middleware/isAuthenticated')(db);

    router.post('/create', isAuthenticated, (req, res) => {
        // Need to find if there's a duplicate email in db
        db.Donation.create(req.body).then(() => {
            db.Child.update(
                { chosen: true },
                { where: { id: req.body.receivingChildID } }
            )
                .then((response) => res.status(200).json(response))
                .catch((err) => {
                    res.status(400).json(err);
                });
        });
    });

    router.get('/shipment', isAuthenticated, (req, res) => {
        db.Donation.findAll({
            where: { receivingParentID: req.headers['x-user-id'] },
        })
            .then((response) => res.json(response))
            .catch((err) => res.json(err));
    });

    return router;
};
