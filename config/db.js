const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  "root",
  process.env.DATABASE_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    port: process.env.DATABASE_PORT,
  }
);

module.exports = sequelize;
