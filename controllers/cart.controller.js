const { Customer, Cart} = require("../models/index");

module.exports = {
    getCard: async(req, res) => {
        const { id: customer_id } = req.params;
        const response = {};
        try {
            const carts = await Cart.findAll({
                where: {customer_id},
                order: [["id", "asc"]],
            });
            Object.assign(response, {
                status: 200,
                message: "Success",
                data: carts
            });
        } catch {
            Object.assign(response, {
              status: 500,
              message: "Server Error",
            });
        }
        res.status(response.status).json(response);
    },

    add: async(req, res) => {
        const body = req.body;
        const { product_id, customer_id, amount, limit, price, price_old, src, title } = req.body;
        const response = {};
        try {   
            const cart = await Cart.findOrCreate({
                where: { product_id },
                defaults: {
                    product_id,
                    customer_id,
                    amount,
                    limit,
                    price,
                    price_old,
                    src,
                    title
                }
            });
            Object.assign(response, {
                status: 200,
                message: "Success",
                data: cart,
            });
        } catch {
             Object.assign(response, {
               status: 500,
               message: "Server Error",
             });
        }
        res.status(response.status).json(response);
    },

    update: async(req, res) => {
        const { id } = req.params;
        const body = req.body;
        const response = {};
        try {
            const cart = await Cart.update(body, {
                where: { id },
            });
            Object.assign(response, {
                status: 200,
                message: "Success",
                data: cart,
            });
        } catch {
            Object.assign(response, {
              status: 500,
              message: "Server Error",
            });
        }
        res.status(response.status).json(response);
    },

    delete: async(req, res) => {
        const { id } = req.params;
        const response = {};
        try {
            await Cart.destroy({
                where: { id }
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
    }
}