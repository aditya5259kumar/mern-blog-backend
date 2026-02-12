import express from "express";
import userAuth from "../controller/userAuthController.js";

const router = express.Router();

router.post("/signup", userAuth.signup);
router.post("/login", userAuth.login);

export default router;
