const express = require("express");
const categoryController = require("../controllers/categoryController");
const { authenticateJWT } = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticateJWT, categoryController.getCategories);
router.post("/create", authenticateJWT, categoryController.createCategory);

router.get(
  "/with-books",
  authenticateJWT,
  categoryController.getCategoriesWithBooks
);

router.get("/:id", authenticateJWT, categoryController.getCategory);
router.patch("/:id/update", authenticateJWT, categoryController.updateCategory);
router.delete(
  "/:id/delete",
  authenticateJWT,
  categoryController.deleteCategory
);

module.exports = router;
