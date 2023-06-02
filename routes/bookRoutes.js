const express = require("express");
const bookController = require("../controllers/bookController");
const { authenticateJWT } = require("../middleware/auth");

const router = express.Router();

router.route("/basic").get(authenticateJWT, bookController.getBooksBasic);
router
  .route("/")
  .get(authenticateJWT, bookController.getBooks)
  .post(authenticateJWT, bookController.createBook);

router
  .route("/:id")
  .get(authenticateJWT, bookController.getBook)
  .patch(authenticateJWT, bookController.updateBook)
  .delete(authenticateJWT, bookController.deleteBook);

module.exports = router;
