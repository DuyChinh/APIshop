var express = require('express');
var router = express.Router();
const userController = require("../controllers/user.controller");

router.post('/', userController.add);
router.get("/:id", userController.getCustomer);


module.exports = router;
