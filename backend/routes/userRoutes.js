import express from "express";
import userController from "../controller/userController.js";
import authenticateUser from "../middleware/authenticateUser.js";

const router = express.Router();

router.get("/my-profile", authenticateUser, userController.myProfile);
export default router;
