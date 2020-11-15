const router = require('express').Router();

module.exports = (db) => {
    //  api/charts
    router.get('/', (req, res) => {
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
        console.log('api/charts');
    });

    return router;
};
