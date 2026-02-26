import { body, validationResult } from "express-validator";
import helper from "../utils/helper.js";

const authValidator = {
  signupValidator: [
    body("userName")
      .notEmpty()
      .withMessage("username is required!")
      .matches(/^[a-zA-Z][a-zA-Z0-9_]{2,19}$/)
      .withMessage(
        "username must start with a letter and contain only letters, digits and '_'",
      ),
    body("email")
      .notEmpty()
      .withMessage("email is required!")
      .isEmail()
      .withMessage("invalid email address!"),
    body("password")
      .notEmpty()
      .withMessage("password is required!")
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 characters")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@!#$%^&*_=+]).{8,}$/)
      .withMessage(
        "password must contain a lowercase letter, uppercase letter, number, special character",
      ),
  ],

  loginValidator: [
    body("email")
      .notEmpty()
      .withMessage("email is required!")
      .isEmail()
      .withMessage("invalid email address!"),
    body("password").notEmpty().withMessage("password is required!"),
  ],

  validate: (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return helper.error(res, "", error.array());
    }
    next();
  },
};

export default authValidator;
