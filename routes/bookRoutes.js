const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

router.route("/basic").get(bookController.getBooksBasic);
router.route("/").get(bookController.getBooks).post(bookController.createBook);

module.exports = router;
