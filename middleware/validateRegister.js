const { body, validationResult } = require("express-validator");

exports.validateRegister = [
  body("username")
    .trim()
    .matches(/^[a-zA-Z]{1}[a-zA-Z0-9_]{5,}$/)
    .withMessage("Invalid username"),
  body("email").trim().isEmail().withMessage("Invalid email address"),
  body("password")
    .trim()
    .matches(/^(?=.*[A-Za-z])(?=.*\d){3,}.*[A-Za-z\d]{6,}$/)
    .withMessage("Invalid password"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
