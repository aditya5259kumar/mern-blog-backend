import express from "express";
import blogController from "../controller/blogController.js";
import authenticateUser from "../middleware/authenticateUser.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// read blog
router.get("/all-blogs", blogController.allBlogs);

// read single blog
router.get("/blog/:id", authenticateUser, blogController.singleBlogDetail);

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

// blog category
router.get("/category/:category", blogController.blogCategory);

// search blog
router.get("/search-blog", blogController.searchBlog);

// like blog
router.post("/blog/:blogId/like", authenticateUser, blogController.likeBlog);

// unlike blog
router.delete(
  "/blog/:blogId/unlike",
  authenticateUser,
  blogController.unLikeBlog,
);

export default router;
