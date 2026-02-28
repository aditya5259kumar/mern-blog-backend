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

// all authors
router.get("/all-authors", userController.allAuthors);

// authors detail
router.get("/author/:id",authenticateUser, userController.singleAuthorDetail);

// search author
router.get("/search-author", userController.searchAuthor);

export default router;
