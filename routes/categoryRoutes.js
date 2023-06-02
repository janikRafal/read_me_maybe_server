const express = require("express");
const categoryController = require("../controllers/categoryController");
const { authenticateJWT } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(authenticateJWT, categoryController.getCategories)
  .post(authenticateJWT, categoryController.createCategory);

router
  .route("/:id")
  .get(authenticateJWT, categoryController.getCategory)
  .patch(authenticateJWT, categoryController.updateCategory)
  .delete(authenticateJWT, categoryController.deleteCategory);

module.exports = router;
