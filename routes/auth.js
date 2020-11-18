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
    const token = require('../config/tokens');

    router.post('/login', passport.authenticate('local'), (req, res) => {
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
            userName: req.user.userName,
            id: req.user.id,
            address1: req.user.address1,
            city: req.user.city,
            state: req.user.state,
            zipcode: req.user.zipcode,
            accessToken: token({
                passLength: 64,
                upper: true,
                lower: true,
                numbers: true,
                special: true,
            }),
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
