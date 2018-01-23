const router = require("express").Router();
const billsController = require('../../controllers/bills');

router.route("/create").post(billsController.createBill);
router.route("/update/shares").put(billsController.updateShares);
router.route("/find/:bill/:hive").get(billsController.findBill);
router.route("/find/all/:hive").get(billsController.findBills);
router.route("/update/pay/").put(billsController.updatePaid);
router.route("/update/addshare").put(billsController.addBillMember);

module.exports = router;