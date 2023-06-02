const express = require("express");
const authController = require("../controllers/authController");
const { validateRegister } = require("../middleware/validateRegister");

const router = express.Router();

router.post("/register", validateRegister, authController.register);
router.route("/login").post(authController.login);

module.exports = router;
