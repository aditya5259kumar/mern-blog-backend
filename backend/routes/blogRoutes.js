import express from "express";
import blogController from "../controller/blogController.js";

const router = express.Router();

// read blog
router.get("/all-blogs", blogController.allBlogs);

// create blog
router.post("/create-blog", blogController.createBlog);

// delete blog
router.get("/my-blogs", blogController.myBlogs);

// delete blog
router.delete("/delete-blog/:id", blogController.deleteBlog);

// update blog
router.put("/update-blog/:id", blogController.updateBlog);

export default router;
