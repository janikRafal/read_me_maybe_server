const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Book = require("./bookModel");

const Category = sequelize.define(
  "Categories",
  {
    CategoryID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    CategoryName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Category;
