module.exports = (db, sequelize) => {
    const router = require('express').Router();
    const chartRoutes = require('./charts')(db, sequelize);

    // API routes: api/
    router.use('/charts', chartRoutes);

    return router;
};
