module.exports = (db, passport) => {
    const router = require('express').Router();
    const chartRoutes = require('./charts')(db);
    const authRoutes = require('./auth')(db, passport);
    const profileRoutes = require('./profileRoutes')(db);
    const childRoutes = require('./childRoutes')(db);

    // API routes: api/
    router.use('/api/charts', chartRoutes);
    router.use('/api/auth', authRoutes);
    router.use('/api/profile', profileRoutes);
    router.use('/api/child', childRoutes);

    return router;
};
