const { where } = require("sequelize");
const { Address } = require("../models/index");
module.exports = {
  add: async (req, res) => {
    const { customer_id, name, phone, province, address_detail } = req.body;
    console.log(req.body);
    const response = {};
    try {
        let delivery = false;
        const addresses = await Address.findAll({where: {customer_id}});
        console.log(addresses);
        if(addresses.length === 0) {
            console.log("zooooo"); 
            delivery = true;
        }
      const address = await Address.findOrCreate({
        where: { name, phone, address_detail },
        defaults: {
          customer_id,
          name,
          phone,
          province,
          address_detail,
          delivery,
        },
      });
      Object.assign(response, {
        status: 200,
        message: "Success",
        data: address,
      });
    } catch {
      Object.assign(response, {
        status: 500,
        message: "Server Error",
      });
    }
    res.status(response.status).json(response);
  },

  get: async (req, res) => {
    const { id: customer_id } = req.params;
    const response = {};
    try {
      const addresses = await Address.findAll({
        where: { customer_id },
      });
      Object.assign(response, {
        status: 200,
        message: "Success",
        data: addresses,
      });
    } catch {
      Object.assign(response, {
        status: 500,
        message: "Server Error",
      });
    }
    res.status(response.status).json(response);
  },

  update: async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const body =  req.body;
    console.log(body);
    const { delivery } = req.body;
    const response = {};
    try {
        const address = await Address.update({delivery}, {
            where: { id },
        });
        Object.assign(response, {
            status: 200,
            message: "Success",
            data: address,
        });
      
    } catch {
      Object.assign(response, {
        status: 500,
        message: "Server Error",
      });
    }
    res.status(response.status).json(response);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const response = {};
    try {
      await Address.destroy({
        where: { id },
      });
      Object.assign(response, {
        status: 200,
        message: "Success",
      });
    } catch {
      Object.assign({
        status: 500,
        message: "Server Error",
      });
    }
    res.status(response.status).json(response);
  },
};