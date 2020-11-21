const router = require('express').Router();
const childRoutes = require('./child');

// API routes: api/
router.use('/child', childRoutes);

module.exports = router;
