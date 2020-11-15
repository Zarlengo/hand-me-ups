const router = require('express').Router();

module.exports = (db, passport) => {
    router.post('/login', passport.authenticate('local'), (req, res) => {
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
            userName: req.user.userName,
            id: req.user.id,
            address1: req.user.address1,
            city: req.user.city,
            state: req.user.state,
            zipcode: req.user.zipcode,
            accessToken:
                '$hMUI"WLM^.QV8cqJh|"5f)|806&|k|+Hgzo^\'9DMSzIW+lE}IcqLwkePp2N;X*',
        });
    });

    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    router.post('/signup', (req, res) => {
        db.Parent.create({
            userName: req.body.userName,
            password: req.body.password,
            address1: req.body.address1,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
        })
            .then(() => {
                res.redirect(307, '/login');
            })
            .catch((err) => {
                res.status(401).json(err);
            });
    });

    router.put('/user/:id', (req, res) => {
        // Need to find if there's a duplicate email in db
        db.Parent.update(req.body, {
            where: {
                id: req.params.id,
            },
        }).then((dbPost) => {
            res.json(dbPost);
        });
    });

    router.delete('/user/:id', (req, res) => {
        db.Parent.destroy({
            where: {
                id: req.params.id,
            },
        }).then(() => {
            req.logout();
            res.redirect('/');
        });
    });

    router.get('/user_data', (req, res) => {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                id: req.user.id,
                firstName: req.user.firstName,
                email: req.user.email,
                emailOptIn: req.user.emailOptIn,
            });
        }
    });

    return router;
};
