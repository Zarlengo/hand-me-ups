const router = require('express').Router();

module.exports = (db) => {
    const isAuthenticated = require('../config/middleware/isAuthenticated')(db);
    //  api/charts
    router.get('/', isAuthenticated, (req, res) => {
        db.Child.findAll({
            attributes: [
                [
                    db.sequelize.fn('sum', db.sequelize.col('toysDonated')),
                    'toysDonated',
                ],
                [
                    db.sequelize.fn('sum', db.sequelize.col('clothesDonated')),
                    'clothesDonated',
                ],
                [
                    db.sequelize.fn(
                        'sum',
                        db.sequelize.col('furnitureDonated')
                    ),
                    'furnitureDonated',
                ],
            ],
            raw: true,
        })
            .then((response) => {
                res.json(response);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    });

    return router;
};
