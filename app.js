const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const authRouter = require("./routes/auth");
const bookRouter = require("./routes/bookRoutes");
const categoryRouter = require("./routes/categoryRoutes");

//Middlewares
const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.use("/auth", authRouter);
app.use("/book-list", bookRouter);
app.use("/category-list", categoryRouter);

module.exports = app;
