const { Product } = require("../models/index");
const moment = require("moment");
module.exports = {
  addProduct: (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    res.render("product/add", { title: "Thêm sản phẩm", success, error });
  },

  handleAddProduct: async (req, res) => {
    const body = req.body;
    try {
      const products = await Product.create(body);
      req.flash("success", "Thêm sản phẩm thành công!");
      res.redirect(req.get("referer"));
    } catch {
      req.flash("error", "Thêm sản phẩm thất bại!");
      res.redirect(req.get("referer"));
    }
  },

  showProducts: async(req, res) => {
    const products = await Product.findAll({order: [['id', 'desc']]});
    const success = req.flash("success");
    const error = req.flash("error");
    res.render("product/table", {products, moment, success, error});
  },

  handleDelete:async(req, res) => {
    const { id } = req.params;
    try {
        await Product.destroy({ where: {id}});
        req.flash("success", "Xóa thành công!");
        res.redirect(req.get("referer"));
    } catch {
        req.flash("error", "Xóa thất bại!");
        res.redirect(req.get("referer"));
    }
  }
};