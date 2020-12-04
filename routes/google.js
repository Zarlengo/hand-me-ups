module.exports = (db) => {
    const router = require('express').Router();
    const isAuthenticated = require('../config/middleware/isAuthenticated')(db);

    // api/google/locations
    router.get('/locations', isAuthenticated, (req, res) => {
        db.Parent.findAll({ attributes: ['latLng'], raw: true })
            .then((response) => res.json(response))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    });
    return router;
};
