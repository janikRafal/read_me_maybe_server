const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("readingwishlist", "root", "qwerty69!", {
  host: "localhost",
  dialect: "mysql",
  port: 3307,
});

module.exports = sequelize;
