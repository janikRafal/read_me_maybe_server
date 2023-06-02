const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

router.route("/").get(bookController.getBooks);

module.exports = router;
