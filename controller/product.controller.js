const productModel = require("../models/product.model");
const stockModel = require("../models/stock.model");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/helpers");

exports.addProduct = async (req, res) => {
  try {
    const bodyData = req.body;

    // add product
    const product = new productModel({ ...bodyData });
    await product.save();
    // create stock
    const stock = new stockModel({
      product: product._id,
    });
    await stock.save();

    sendSuccessResponse(res, "Product Added success", product);
  } catch (err) {
    sendErrorResponse(res, "Failed to add product", err);
    console.log("error", err);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const findQuery = { ...req.query };
    let defaultAggregation = productModel.getAggregation?.()
      ? productModel.getAggregation()
      : [];
    const productsRes = await productModel.aggregate([
      ...defaultAggregation,
      { $match: findQuery },
    ]);
    sendSuccessResponse(res, "Product find success", productsRes);
  } catch (err) {
    sendErrorResponse(res, "Failed to find product", err);
    console.log("[GET_PRODUCT]", err);
  }
};
