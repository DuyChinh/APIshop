const { Customer } = require("../models/index");
module.exports = {
    add: async(req, res) => {
        const { id, name, email, password} = req.body;
        console.log(name, email);
        const response = {};
        try {
            const [customer] = await Customer.findOrCreate({
              where: { id },
              defaults: {
                id,
                name, 
                email,
                password,
              },
            });
            Object.assign(response, {
                status: 200,
                message: "Success",
                data: customer,
            });
        } catch {
            Object.assign(response, {
              status: 500,
              message: "Server Error",
            });
        }
        res.status(response.status).json(response);
    },

    getCustomer: async(req, res) => {
      const { id } = req.params;
      const response = {};
      try {
        const customer = await Customer.findByPk(id);
        Object.assign(response,  {
          status: 200,
          message: "Success",
          data: customer,
        });
      } catch {
        Object.assign(response, {
          status: 500,
          message: "Server Error",
        });
      }
      res.status(response.status).json(response);
    }
}