const stockModel = require("../models/stock.model");
const transactionModel = require("../models/transaction.model");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/helpers");

exports.createTransaction = async (req, res) => {
  const { product, type, quantity, ...restBody } = req.body;
  try {
    const stock = await stockModel.findOne({ product });
    if (!stock) {
      return sendErrorResponse(res, "Stock not found");
    }

    if (type === "buy") {
      stock.quantity += parseInt(quantity);
    } else {
      if (stock.quantity == 0) {
        return sendErrorResponse(res, "Product out of stock");
      }
      stock.quantity -= parseInt(quantity);
    }
    const transaction = new transactionModel({
      product,
      type,
      quantity,
      ...restBody,
    });
    await transaction.save();
    await stock.save();
    sendSuccessResponse(res, "success", transaction);
  } catch (err) {
    sendErrorResponse(res, "Failed to create transaction", err);
    console.log("[CREATE_TRANSACTION]", err);
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await transactionModel
      .find({
        ...req.query,
      })
      .populate("product");
    return sendSuccessResponse(res, "success", transactions);
  } catch (err) {
    sendErrorResponse(res, "Failed to find transaction", err);
    console.log("[GET_TRANSACTION]", err);
  }
};
