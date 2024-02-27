'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("carts", {
      type: "foreign key",
      fields: ["customer_id"],
      name: "customers_carts_foreign_key",
      references: {
        table: 'customers',
        field: "id",
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "carts",
      "customers_carts_foreign_key"
    );
  }
};
