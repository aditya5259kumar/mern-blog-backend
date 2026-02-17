import express from "express";
import blogController from "../controller/blogController.js";
import authenticateUser from "../middleware/authenticateUser.js";

const router = express.Router();

// read blog
router.get("/all-blogs", blogController.allBlogs);

// create blog
router.post("/create-blog", authenticateUser, blogController.createBlog);

// delete blog
router.get("/my-blogs", authenticateUser, blogController.myBlogs);

// delete blog
router.delete("/delete-blog/:id", authenticateUser, blogController.deleteBlog);

// update blog
router.put("/update-blog/:id", authenticateUser, blogController.updateBlog);

export default router;
