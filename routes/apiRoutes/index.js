const router = require("express").Router();
const bees = require("./bees");
const bills = require("./bills");
router.use("/bees", bees);
router.use("/bills", bills);
module.exports = router;