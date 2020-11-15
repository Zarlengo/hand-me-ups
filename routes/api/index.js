module.exports = (db, sequelize) => {
    const router = require('express').Router();
    const chartRoutes = require('./charts')(db, sequelize);
    const profileRoutes = require('./profileRoutes')(db, sequelize);

    // API routes: api/
    router.use('/charts', chartRoutes);
    router.use('/profile', profileRoutes);

    return router;
};
