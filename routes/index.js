module.exports = (db, passport) => {
    const router = require('express').Router();
    const chartRoutes = require('./charts')(db);
    const authRoutes = require('./auth')(db, passport);
    const profileRoutes = require('./profileRoutes')(db);

    // API routes: api/
    router.use('/api/charts', chartRoutes);
    router.use('/api/auth', authRoutes);
    router.use('/api/profile', profileRoutes);

    return router;
};
