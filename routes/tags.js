module.exports = (db) => {
    const router = require('express').Router();
    const isAuthenticated = require('../config/middleware/isAuthenticated')(db);

    router.get('/', isAuthenticated, (req, res) => {
        db.Tag.findAll({})
            .then((response) => {
                res.json(response);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    });

    return router;
};
