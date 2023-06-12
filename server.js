const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

db.authenticate()
  .then(() => {
    console.log("Connected to the database.");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
