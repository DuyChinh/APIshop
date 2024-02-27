'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price_old: {
        type: DataTypes.INTEGER,
      },
      limit: {
        type: DataTypes.INTEGER,
      },
      amount: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      src: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
      }
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Product;
};