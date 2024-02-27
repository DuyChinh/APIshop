'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("addresses", {
      type: "foreign key",
      fields: ["customer_id"],
      name: "addresses_customers_foreign_key",
      references: {
        table: "customers",
        field: "id",
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("addresses", "addresses_customers_foreign_key");
  }
};
