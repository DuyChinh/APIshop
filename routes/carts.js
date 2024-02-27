var express = require("express");
var router = express.Router();
const cartController = require("../controllers/cart.controller");

router.post("/", cartController.add);
router.get("/:id", cartController.getCard);
router.patch("/:id", cartController.update);
router.delete("/:id", cartController.delete);



module.exports = router;
