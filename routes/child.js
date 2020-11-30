module.exports = (db) => {
    const router = require('express').Router();
    const cryptographic = require('./cryptographic');
    //api/child
    router.get('/children/:id', (req, res) => {
        db.User.findByPk(req.params.id).then((response) => {
            const answer = cryptographic(
                req.headers['x-access-token'],
                response.accessToken
            );
            if (!answer) {
                res.status(401).json({ message: 'invalid credentials' });
            } else {
                db.Tag.findAll({}).then((alltags) => {
                    db.Child.findAll({}).then((r) => {
                        res.json(
                            r.map((child) => {
                                const age = Math.floor(
                                    (Date.now() - new Date(child.birthday)) /
                                        (365 * 24 * 60 * 60 * 1000)
                                );
                                const tags = [];

                                if (child.tags) {
                                    console.log(child.tags, 'child.tags');
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
            }
        });
    });
    return router;
};
