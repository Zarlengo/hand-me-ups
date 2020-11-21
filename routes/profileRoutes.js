module.exports = (db) => {
    const router = require('express').Router();
    const cryptographic = require('./cryptographic');

    router.get('/:id', (req, res) => {
        db.User.findByPk(req.params.id)
            .then((response) => {
                const answer = cryptographic(
                    req.headers['x-access-token'],
                    response.accessToken
                );
                if (!answer) {
                    res.status(401).json({ message: 'invalid credentials' });
                } else {
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
                            res.json(response);
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json(err);
                        });
                }
            })
            .catch((err) => res.status(400).json(err));
    });

    router.put('/:id', (req, res) => {
        db.User.findByPk(req.params.id).then((response) => {
            const answer = cryptographic(
                req.headers['x-access-token'],
                response.accessToken
            );
            if (!answer) {
                res.status(401).json({ message: 'invalid credentials' });
            } else {
                db.Parent.update(req.body, { where: { id: req.params.id } })
                    .then((response) => {
                        res.json(response);
                    })
                    .catch((err) => {
                        res.status(400).json(err);
                    });
            }
        });
    });

    router.post('/addChild/:id', (req, res) => {
        db.User.findByPk(req.params.id).then((response) => {
            const answer = cryptographic(
                req.headers['x-access-token'],
                response.accessToken
            );
            if (!answer) {
                res.status(401).json({ message: 'invalid credentials' });
            } else {
                console.log(req.body);
                db.Child.create(req.body)
                    .then((response) => {
                        res.json(response);
                    })
                    .catch((err) => {
                        res.status(400).json(err);
                    });
            }
        });
    });

    return router;
};
