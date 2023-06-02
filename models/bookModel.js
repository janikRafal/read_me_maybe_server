const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Book = sequelize.define(
  "Books",
  {
    BookID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    BookTitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Author: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ISBN: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
    CategoryID: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories",
        key: "CategoryID",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Book;
