module.exports = (db) => {
    const router = require('express').Router();
    const cryptographic = require('./cryptographic');

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
    router.delete('/deleteChild/:id', (req, res) => {
        db.User.findByPk(req.params.id).then((response) => {
            const answer = cryptographic(
                req.headers['x-access-token'],
                response.accessToken
            );
            console.log(answer);
            if (!answer) {
                res.status(401).json({ message: 'invalid credentials' });
            } else {
                console.log(req.body);
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

    router.put('/editChild/:id', (req, res) => {
        console.log(req);
        db.User.findByPk(req.params.id).then((response) => {
            const answer = cryptographic(
                req.headers['x-access-token'],
                response.accessToken
            );
            if (!answer) {
                res.status(401).json({ message: 'invalid credentials' });
            } else {
                console.log(req.body);
                db.Child.update(req.body, { where: { id: req.body.id } })
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
