import express from "express";
import userAuth from "../controller/userAuthController.js";
import authValidator from "../validators/authValidator.js";

const router = express.Router();

const { signupValidator, loginValidator, validate } = authValidator;

// signup----------
router.post("/signup", signupValidator, validate, userAuth.signup);

// login----------
router.post("/login", loginValidator, validate, userAuth.login);

export default router;
