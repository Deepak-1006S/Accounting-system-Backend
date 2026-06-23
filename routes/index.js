const { Router } = require("express");
const router = Router();

const userRouter = require("./user.routes");
const productRouter = require("./product.routes");
const transactionRouter = require("./transaction.routes");
module.exports = router
  .use("/auth", userRouter)
  .use("/transactions", transactionRouter)
  .use("/products", productRouter);
