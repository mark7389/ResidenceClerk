const router = require("express").Router();
const bees = require("./bees");

router.use("/bees", bees);

module.exports = router;