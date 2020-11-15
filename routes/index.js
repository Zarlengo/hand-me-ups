module.exports = (db, passport) => {
    // const path = require("path");
    const router = require('express').Router();
    const apiRoutes = require('./api')(db, passport);
    const htmlRoutes = require('./html');

    // API Routes
    router.use('/api', apiRoutes);

    // HTML Routes
    router.use('/', htmlRoutes);

    return router;
};
