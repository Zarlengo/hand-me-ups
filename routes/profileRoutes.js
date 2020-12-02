module.exports = (db) => {
    const router = require('express').Router();
    const isAuthenticated = require('../config/middleware/isAuthenticated')(db);

    // api/profile/:id
    router.get('/:id', isAuthenticated, (req, res) => {
        db.User.findAll({
            attributes: ['id', 'email'],
            where: { id: req.params.id },
            raw: true,
            include: [
                {
                    model: db.Parent,
                    attributes: [
                        'id',
                        'firstName',
                        'lastName',
                        'address1',
                        'city',
                        'state',
                        'zipCode',
                    ],
                    include: [
                        {
                            model: db.Child,
                            attributes: [
                                'firstName',
                                'lastName',
                                'birthday',
                                'gender',
                                'receiveToys',
                                'receiveClothes',
                                'receiveFurniture',
                                'donateToys',
                                'donateClothes',
                                'donateFurniture',
                                'toysDonated',
                                'clothesDonated',
                                'furnitureDonated',
                            ],
                        },
                    ],
                },
            ],
        })
            .then((response) => {
                console.log(response);
                res.json(response);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    });

    router.put('/:id', isAuthenticated, (req, res) => {
        db.Parent.update(req.body, { where: { id: req.params.id } })
            .then((response) => {
                res.json(response);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    });

    return router;
};
