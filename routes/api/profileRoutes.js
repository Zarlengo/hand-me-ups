const router = require('express').Router();

module.exports = (db) => {
    router.get('/:id', (req, res) => {
        console.log('PARENT');
        db.Parent.findAll({
            attributes: [
                db.sequelize.col('userName'),
                db.sequelize.col('address1'),
                db.sequelize.col('city'),
                db.sequelize.col('state'),
                db.sequelize.col('zipcode'),
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
