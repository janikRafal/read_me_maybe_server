const express = require("express");
const bookController = require("../controllers/bookController");
const { authenticateJWT } = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticateJWT, bookController.getBooks);
router.post("/create", authenticateJWT, bookController.createBook);

router
  .get("/:id", authenticateJWT, bookController.getBook)
  .patch("/:id/update", authenticateJWT, bookController.updateBook)
  .delete("/:id/delete", authenticateJWT, bookController.deleteBook);

router.get(
  "/:id/details",
  authenticateJWT,
  bookController.getBookWithCategoryName
);

module.exports = router;
