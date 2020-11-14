const router = require('express').Router();

module.exports = (db, sequelize) => {
    //  api/charts
    router.get('/', (req, res) => {
        db.Child.findAll({
            attributes: [
                [
                    sequelize.fn('sum', sequelize.col('toysDonated')),
                    'toysDonated',
                ],
                [
                    sequelize.fn('sum', sequelize.col('clothesDonated')),
                    'clothesDonated',
                ],
                [
                    sequelize.fn('sum', sequelize.col('furnitureDonated')),
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
