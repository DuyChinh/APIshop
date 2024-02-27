const { Product } = require("../models/index");
module.exports = {
    add: async(req, res) => {
        const { title, price, price_old, limit, src } = req.body;
        const body = req.body;
        const response = {};
        //check exist of product 
        try {
            const product = await Product.findOne({where: {title}});
            if(product) {
                Object.assign(response, {
                    status: 400,
                    message: "Bad Request",
                });
                res.status(response.status).json(response);
            } 
            try {
                const product = await Product.create(body);
                Object.assign(response, {
                    status: 200,
                    message: "Success",
                    data: product,
                });
            } catch {
                Object.assign(response, {
                  status: 500,
                  message: "Server Error",
                });
            }
        } catch {
            Object.assign(response, {
                status: 500,
                message: "Server Error",
            });
        }
        res.status(response.status).json(response);
    },

    getProducts: async(req, res) => {
        const response = {};
        try {
            const products = await Product.findAll({ order: [["id", "asc"]] });
            Object.assign(response, {
                status: 200,
                message: "Success",
                data: products,
            });
        } catch {
            Object.assign(response, {
            status: 500,
            message: "Server Error",
            });
        }
        return res.status(response.status).json(response);
    },

    getProductDetail: async(req, res) => {
        const { id } = req.params;
        console.log(id);
        const response = {};
        try {
            const product = await Product.findByPk(id);
            Object.assign(response, {
                status: 200,
                message: "Success",
                data: product
            });
            if(!product) {
                Object.assign(response, {
                  status: 404,
                  message: "Not Found",
                });
            }
        } catch {
            Object.assign(response, {
              status: 500,
              message: "Server Error",
            });
        }
        return res.status(response.status).json(response);
    }


}