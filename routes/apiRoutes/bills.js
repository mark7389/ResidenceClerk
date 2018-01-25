const billsController = require('../../controllers').bills;
const router = require("express").Router();
router.route("/create").post(billsController.createBill);
router.route("/updateshares").put(billsController.updateShares);
router.route("/find/:name/:hive").get(billsController.findBill);
router.route("/all/:hive").get(billsController.findBills);
router.route("/updatepay").put(billsController.updatePaid);
router.route("/updateaddshare").put(billsController.addBillMember);

module.exports = router;