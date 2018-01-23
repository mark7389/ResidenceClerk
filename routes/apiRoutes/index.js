const router = require("express").Router();
const bees = require("./bees");
const bills = require("./bills");
const hive = require("./hive");
router.use("/bees", bees);
router.use("/bills", bills);
router.use("/hive", hive);
module.exports = router;