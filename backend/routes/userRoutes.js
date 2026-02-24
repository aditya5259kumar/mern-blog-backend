import express from "express";
import userController from "../controller/userController.js";
import authenticateUser from "../middleware/authenticateUser.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// my profile
router.get("/my-profile", authenticateUser, userController.myProfile);

// update profile
router.put(
  "/profile-update",
  authenticateUser,
  upload.single("pfp"),
  userController.updateProfile,
);

export default router;
