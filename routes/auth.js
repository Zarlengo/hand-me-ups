module.exports = (db, passport) => {
    // Login request -> Client embeds client_key in request for API library.
    //      Server determines host that has access to the API, if any.
    // AccessToken -> Server picks "salt" for a session key and sends it to the client with the library [or as part of another pre-auth exchange].
    // Client calculates a session_key using hash(document.location.host + session_salt).
    // Client uses session_key + client_key for an API call.
    // Server validates the call by looking up the client_key's host and "salt" in the session, computing the hash, and comparing to the provided client_key.
    // Secondly, you need to impede Hacker Hank from opening the debug console or using a modified client on Site A to do whatever he wants with your API.

    // Note though, that it's very difficult, if not impossible, to completely prevent Hacker Hank from abusing the API. But, you can make it more difficult. And the most reasonably way to impede Hank, that I'm aware of, is rate limiting.

    // Limit the number of requests/second/session and requests/hour/session. (Spikes in activity are probably reasonable, but not sustained above-average traffic from a single client.)
    // Limit the number of sessions/IP/hour.
    // Limit the number of requests/IP/hour. Allow spikes, but not sustained heavy traffic from a single IP.
    // Thirdly, as you're likely already doing: encrypt the traffic. Sure, the NSA will see it; but Hacker Hank is less likely to.

    const router = require('express').Router();
    const tokens = require('../config/tokens');
    const isAuthenticated = require('../config/middleware/isAuthenticated')(db);

    // api/auth/login
    router.post('/login', passport.authenticate('local'), (req, res) => {
        // Sending back a password, even a hashed password, isn't a good idea
        const accessToken = tokens.create({
            passLength: 64,
            upper: true,
            lower: true,
            numbers: true,
            special: true,
        });

        const sessionSalt = tokens.create({
            passLength: 32,
            upper: true,
            lower: true,
            numbers: true,
        });

        db.User.update(
            { accessToken, sessionSalt },
            {
                where: {
                    id: req.user.id,
                },
            }
        ).then(() => {
            const childArray = [];
            req.user.Parent.Children.forEach((child) => {
                childArray.push({
                    childId: child.id,
                    firstName: child.firstName,
                    lastName: child.lastName,
                    birthday: child.birthday,
                    gender: child.gender,
                    receiveToys: child.receiveToys,
                    receiveClothes: child.receiveClothes,
                    receiveFurniture: child.receiveFurniture,
                    donateToys: child.donateToys,
                    donateClothes: child.donateClothes,
                    donateFurniture: child.donateFurniture,
                    toysDonated: child.toysDonated,
                    clothesDonated: child.clothesDonated,
                    furnitureDonated: child.furnitureDonated,
                    tags: child.tags,
                });
            });
            res.json({
                email: req.user.email,
                id: req.user.id,
                accessToken,
                sessionSalt,
                firstName: req.user.Parent.firstName,
                lastName: req.user.Parent.lastName,
                address1: req.user.Parent.address1,
                city: req.user.Parent.city,
                state: req.user.Parent.state,
                zipCode: req.user.Parent.zipCode,
                children: childArray,
            });
        });
    });

    // api/auth/logout
    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    // api/auth/signup
    router.post('/signup', (req, res) => {
        db.User.create({
            email: req.body.email,
            password: req.body.password,
        })
            .then((newUser) => {
                db.Parent.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    address1: req.body.address1,
                    address2: req.body.address2,
                    city: req.body.city,
                    state: req.body.state,
                    zipCode: req.body.zipCode,
                    UserId: newUser.id,
                })
                    .then(() => {
                        res.redirect(307, '/Login');
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(401).json(err);
                    });
            })
            .catch((err) => {
                console.log(err);
                res.status(401).json(err);
            });
    });

    // api/auth/user/:id
    router.put('/user/:id', isAuthenticated, (req, res) => {
        // Need to find if there's a duplicate email in db
        db.Parent.update(req.body, {
            where: {
                id: req.params.id,
            },
        }).then((dbPost) => {
            res.json(dbPost);
        });
    });

    // api/auth/user/:id
    router.delete('/user/:id', isAuthenticated, (req, res) => {
        db.Parent.destroy({
            where: {
                id: req.params.id,
            },
        }).then(() => {
            req.logout();
            res.redirect('/');
        });
    });

    // api/auth/user_data
    router.get('/user_data', isAuthenticated, (req, res) => {
        res.json({
            id: req.user.id,
            firstName: req.user.firstName,
            email: req.user.email,
            emailOptIn: req.user.emailOptIn,
        });
    });

    return router;
};
