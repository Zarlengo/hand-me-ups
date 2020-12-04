module.exports = (db) => {
    const router = require('express').Router();
    const isAuthenticated = require('../config/middleware/isAuthenticated')(db);

    router.post('/addChild/:id', isAuthenticated, (req, res) => {
        db.User.findByPk(req.params.id).then((response) => {
            const answer = cryptographic(
                req.headers['x-access-token'],
                response.accessToken
            );
            if (!answer) {
                res.status(401).json({ message: 'invalid credentials' });
            } else {
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
    router.delete('/deleteChild/:id', isAuthenticated, (req, res) => {
        db.User.findByPk(req.params.id).then((response) => {
            const answer = cryptographic(
                req.headers['x-access-token'],
                response.accessToken
            );

            if (!answer) {
                res.status(401).json({ message: 'invalid credentials' });
            } else {
                db.Child.destroy({ where: { id: req.body.childId } })
                    .then((response) => {
                        res.json(response);
                    })
                    .catch((err) => {
                        res.status(400).json(err);
                    });
            }
        });
    });

    router.put('/editChild/:id', isAuthenticated, (req, res) => {
        db.Child.update(req.body, { where: { id: req.body.id } })
            .then((response) => {
                res.json(response);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    });
    router.get('/children', isAuthenticated, (req, res) => {
        db.Tag.findAll({}).then((alltags) => {
            db.Child.findAll({ where: { chosen: false } }).then((r) => {
                res.json(
                    r.map((child) => {
                        const age = Math.floor(
                            (Date.now() - new Date(child.birthday)) /
                                (365 * 24 * 60 * 60 * 1000)
                        );
                        const tags = [];

                        if (child.tags) {
                            child.tags.forEach((element) => {
                                tags.push(alltags[element - 1]);
                            });
                        }

                        return {
                            gender: child.gender,
                            age,
                            id: child.id,
                            tags,
                        };
                    })
                );
            });
        });
    });
    return router;
};
