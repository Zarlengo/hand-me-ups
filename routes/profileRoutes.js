module.exports = (db) => {
    const router = require('express').Router();
    const isAuthenticated = require('../config/middleware/isAuthenticated')(db);

    // api/profile/loggedOn
    router.get('/loggedOn', isAuthenticated, (req, res) => {
        const users = [];
        for (let i = 1; i < db.loggedOnUsers.length; i++) {
            if (db.loggedOnUsers[i] !== null) {
                users.push(i);
            }
        }
        if (users !== []) {
            db.User.findAll({
                attributes: ['id'],
                where: { id: users },
                include: [
                    {
                        model: db.Parent,
                        attributes: ['firstName'],
                    },
                ],
            })
                .then((response) => res.status(200).json(response))
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                });
        } else {
            res.status(200).json([]);
        }
    });

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
        }).catch((err) => {
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
