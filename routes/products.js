var express = require("express");
var router = express.Router();
const productController = require("../controllers/product.controller");

router.post("/", productController.add);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductDetail);


module.exports = router;