const router = require("express").Router();
const htmlRoutes = require("./html");

// HTML routes
router.use("/", htmlRoutes);

module.exports = router;
