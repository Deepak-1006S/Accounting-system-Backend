const { Router } = require("express");
const transactionController = require("../controller/transaction.controller");
const router = Router();

// URL START WITH : /transaction

router.post("/", transactionController.createTransaction);
router.get("/", transactionController.getTransactions);

module.exports = router;
