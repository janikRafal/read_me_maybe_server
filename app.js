const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const authRouter = require("./routes/auth");
const bookRouter = require("./routes/bookRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const Book = require("./models/bookModel");
const Category = require("./models/categoryModel");

Category.hasMany(Book, { foreignKey: "CategoryID" });
Book.belongsTo(Category, { foreignKey: "CategoryID" });

// Middleware
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRouter);
app.use("/books", bookRouter);
app.use("/categories", categoryRouter);

// Handling urls which don't exist
app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    },
  });
});

module.exports = app;
