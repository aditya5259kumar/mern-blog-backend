import express from "express";
import userAuth from "../controller/userAuth.js";

const router = express.Router();

router.post("/signup", userAuth.signup);

export default router;
