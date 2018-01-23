const router = require("express").Router();
const hiveController = require("../../controllers").hive;

router.route("/find/all").get(hiveController.findUsers);
router.route("/find/:user").get(hiveController.findOne);

module.exports = router;