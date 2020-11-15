const router = require('express').Router();

module.exports = (db, sequelize) => {
    router.get('/:id', (req, res) => {
        console.log('PARENT');
        db.Parent.findAll({
            attributes: [
                sequelize.col('userName'),
                sequelize.col('address1'),
                sequelize.col('city'),
                sequelize.col('state'),
                sequelize.col('zipcode'),
            ],
            where: { id: req.params.id },
            raw: true,
        })
            .then((response) => {
                res.json(response);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
        console.log('api/profile');
    });

    return router;
};
