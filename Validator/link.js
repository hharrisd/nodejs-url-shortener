const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateCreate = [
  check("origUrl")
    .exists()
    .withMessage("origUrl is required.")
    .not()
    .isEmpty()
    .withMessage("origUrl cannot be empty.")
    .isURL()
    .withMessage("The value must be a valid URL string."),
  check("urlId")
    .optional({ nullable: true, checkFalsy: true })
    .matches("^[0-9A-Za-z#]+$")
    .withMessage(
      "The allowed characters are upper and lower case letters, numbers and #"
    )
    .isLength({ min: 4 })
    .withMessage("The short-code needs at least 4 characters."),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateCreate };
