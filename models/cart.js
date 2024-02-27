'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
      },
      customer_id: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price_old: {
        type: DataTypes.INTEGER,
      },
      amount: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      src: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "carts",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Cart;
};