const router = require('express').Router();

const childRoutes = () => {
    router.get('/', (req, res) => {
        res.json();
    });
};
module.exports = childRoutes;
