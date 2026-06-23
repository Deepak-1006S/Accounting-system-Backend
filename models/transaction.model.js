const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: "product",
    required: true,
  },
  type: {
    type: String,
    enum: ["buy", "sell"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  cost_price: {
    type: Number,
    required: true,
  },
  sell_price: {
    type: Number,
  },
});

module.exports = mongoose.model("transaction", TransactionSchema);
