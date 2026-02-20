import express from "express";
import blogController from "../controller/blogController.js";
import authenticateUser from "../middleware/authenticateUser.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// read blog
router.get("/all-blogs", blogController.allBlogs);

// read single blog
router.get("/blog/:id", blogController.singleBlogDetail);

// create blog
router.post(
  "/create-blog",
  authenticateUser,
  upload.array("image", 3),
  blogController.createBlog,
);

// my blogs
router.get("/my-blogs", authenticateUser, blogController.myBlogs);

// delete blog
router.delete("/delete-blog/:id", authenticateUser, blogController.deleteBlog);

// update blog
router.put(
  "/update-blog/:id",
  authenticateUser,
  upload.array("image", 3),
  blogController.updateBlog,
);

export default router;
