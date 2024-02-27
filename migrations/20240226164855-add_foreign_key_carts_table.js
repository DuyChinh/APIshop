'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("carts", {
      type: "foreign key",
      fields: ["product_id"],
      name: "carts_products_foreign_key",
      references: {
        table: "products",
        field: "id",
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("carts", "carts_products_foreign_key");
  }
};
