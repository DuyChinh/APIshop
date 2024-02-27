var express = require("express");
var router = express.Router();
const addressController = require("../controllers/address.controller");

router.post("/", addressController.add);
router.get("/:id", addressController.get);
router.patch("/:id", addressController.update);

router.delete("/:id", addressController.delete);

module.exports = router;
