const { Router } = require("express");
const productController = require("../controller/product.controller");
const router = Router();

// URL START WITH : /product

router.get("/get", productController.getProducts);
router.post("/add", productController.addProduct);

module.exports = router;
