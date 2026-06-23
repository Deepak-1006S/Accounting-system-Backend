const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: "products",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
});

module.exports = mongoose.model("stock", stockSchema);
