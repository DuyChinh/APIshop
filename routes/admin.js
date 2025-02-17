var express = require("express");
var router = express.Router();
const adminController = require("../controllers/admin.controller");
const passport = require("passport");

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/admin/login",
//     failureFlash: true,
//     successRedirect: "/admin",
//   })
// );

/* GET home page. */
router.get("/", (req, res) => {
    res.render("admin/index");
});

router.get("/login", function (req, res, next) {
    const error = req.flash("error");
  res.render("admin/login", { title: "Đăng nhập Admin", error });
});

router.post("/login", function (req, res, next) {
  const { email, password, code } = req.body;
  console.log("email", email);
  if(email === "doanchinhit21@gmail.com" && password === "210203" && code === "2102") {
    req.user = {
      email: email,
    };
    console.log("req.user", req.user);
    

    return res.redirect("/admin");
  }
  req.flash("error", "Thông tin không đúng!");
  return res.redirect(req.get("referer"));
});

router.get("/add-product", adminController.addProduct);
router.post("/add-product", adminController.handleAddProduct);

router.get("/products", adminController.showProducts);
router.post("/products/delete/:id", adminController.handleDelete);

router.get("/logout", (req, res) => {
  req.logout((err) => {});
  return res.redirect("/admin/login");
});



module.exports = router;
