module.exports = (db, passport) => {
    const router = require('express').Router();
    const chartRoutes = require('./charts')(db);
    const authRoutes = require('./auth')(db, passport);
    const profileRoutes = require('./profileRoutes')(db);

    // API routes: api/
    router.use('/charts', chartRoutes);
    router.use('/auth', authRoutes);
    router.use('/profile', profileRoutes);

    return router;
};
