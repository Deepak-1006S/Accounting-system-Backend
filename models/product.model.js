const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  sell_price: {
    type: Number,
    required: true,
  },
  cost_price: {
    type: Number,
    required: true,
  },
});

ProductSchema.statics.getAggregation = () => [
  {
    $lookup: {
      from: "stocks",
      localField: "_id",
      foreignField: "product",
      as: "stock",
    },
  },
  {
    $unwind: {
      path: "$stock",
    },
  },
];

module.exports = mongoose.model("product", ProductSchema);
