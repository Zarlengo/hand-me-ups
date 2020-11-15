module.exports = (db, passport) => {
    const router = require('express').Router();
    const chartRoutes = require('./charts')(db);
    const authRoutes = require('./auth')(db, passport);

    // API routes: api/
    router.use('/charts', chartRoutes);
    router.use('/auth', authRoutes);

    return router;
};
