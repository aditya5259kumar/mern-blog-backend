import fs from "fs";
import path from "path";

import userModel from "../model/users.js";
import blogModel from "../model/blogs.js";
import likeModel from "../model/likes.js";
import helper from "../utils/helper.js";

const blog = {
  // -------- read blog --------
  allBlogs: async (req, res) => {
    try {
      const allBlogs = await blogModel.find().populate("author", "userName");

      helper.success(res, "all blogs fetched successfully.", allBlogs);
    } catch (error) {
      helper.error(res, "something went wrong!", error);
    }
  },

  // -------- read single blog --------
  singleBlogDetail: async (req, res) => {
    try {
      const blogId = req.params.id;

      const likeCount = await likeModel.countDocuments({ blog: blogId });

      const blogDetail = await blogModel
        .findById(blogId)
        .populate("author", "userName profilePhoto");

      if (!blogDetail) {
        return helper.error(res, "Blog not found!");
      }

      const existingLike = await likeModel.findOne({
        blog: blogId,
        user: req.user.id,
      });

      helper.success(res, "Blog fetched successfully.", {
        blog: blogDetail,
        likeCount,
        isLiked: !!existingLike,
      });
    } catch (error) {
      helper.error(res, "Something went wrong!", error);
    }
  },

  // -------- create blog --------
  createBlog: async (req, res) => {
    try {
      const id = req.user.id;
      let { title, category, content } = req.body;

      console.log("RAW CATEGORY:", req.body.category);
      console.log("TYPE:", typeof req.body.category);

      if (typeof category === "string") {
        category = [category];
      }

      if (!title || !content) {
        return helper.error(res, "title and content are required");
      }

      if (!category || category.length === 0) {
        return helper.error(res, "at least one category is required");
      }

      if (category.length > 3) {
        return helper.error(res, "maximum 3 categories allowed");
      }

      if (!req.files || req.files.length === 0) {
        return helper.error(res, "at least one image is required");
      }

      const user = await userModel.findById(id);
      if (!user) {
        return helper.error(res, "User not found", 404);
      }

      // console.log("req.files--------------->", req.files);

      const images = req.files.map((file) => `/uploads/${file.filename}`);

      const blogPost = await blogModel.create({
        title,
        content,
        category,
        images,
        author: user._id,
      });

      return helper.success(res, "Blog created successfully.", 201);
    } catch (error) {
      return helper.error(res, "Something went wrong!", error.message);
    }
  },

  // -------- my blog --------
  myBlogs: async (req, res) => {
    try {
      const id = req.user.id;

      const user = await userModel.findById(id);

      if (!user) {
        helper.error(res, "user not found!", 404);
      }

      const myBlogs = await blogModel.find({ author: user._id });

      if (myBlogs.length === 0) {
        helper.success(res, "user dont have blogs right now.");
      }

      helper.success(res, "my blogs are fetched successfully.", myBlogs);
    } catch (error) {
      helper.error(res, "something went wrong!", error);
    }
  },

  // -------- delete blog --------
  deleteBlog: async (req, res) => {
    try {
      const blogId = req.params.id;
      const userId = req.user.id;

      const blog = await blogModel.findOne({
        _id: blogId,
        author: userId,
      });

      if (!blog) {
        return helper.error(res, "Blog not found!", 404);
      }

      if (blog.images && blog.images.length > 0) {
        blog.images.map((imagePath) => {
          const fullPath = path.join(process.cwd(), "public", imagePath);

          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        });
      }

      await blog.deleteOne();

      return helper.success(res, "Blog deleted successfully.");
    } catch (error) {
      return helper.error(res, "Something went wrong!", error);
    }
  },

  // -------- update blog --------
  updateBlog: async (req, res) => {
    try {
      const userId = req.user.id;
      const blogId = req.params.id;

      let { title, category, content } = req.body;

      const blog = await blogModel.findOne({
        _id: blogId,
        author: userId,
      });

      if (!blog) {
        return helper.error(res, "Blog not found!", 404);
      }

      if (typeof category === "string") {
        category = [category];
      }

      if (!Array.isArray(category) || category.length === 0) {
        return helper.error(res, "At least one category is required");
      }

      if (category.length > 3) {
        return helper.error(res, "Maximum 3 categories allowed");
      }

      const updateData = {
        title: title !== undefined ? title : blog.title,
        category: category !== undefined ? category : blog.category,
        content: content !== undefined ? content : blog.content,
        images: blog.images,
      };

      if (req.files && req.files.length > 0) {
        if (blog.images && blog.images.length > 0) {
          blog.images.map((imagePath) => {
            const fullPath = path.join(process.cwd(), "public", imagePath);

            if (fs.existsSync(fullPath)) {
              fs.unlinkSync(fullPath);
            }
          });
        }

        updateData.images = req.files.map(
          (file) => `/uploads/${file.filename}`,
        );
      }

      const blogPost = await blogModel.findOneAndUpdate(
        { _id: blogId, author: userId },
        updateData,
        { new: true },
      );

      return helper.success(res, "Blog updated successfully.", blogPost);
    } catch (error) {
      return helper.error(res, "Something went wrong!", error.message);
    }
  },

  // -------- blog with category --------
  blogCategory: async (req, res) => {
    try {
      const category = req.params.category;

      const blogs = await blogModel
        .find({ category: category })
        .populate("author", "userName");

      if (!blogs) {
        helper.error(res, "no blog with this category!", error);
      }

      helper.success(
        res,
        "blogs with this category fetched successfully!",
        blogs,
      );
    } catch (error) {
      helper.error(res, "something went wrong!", error);
    }
  },

  // -------- search blog --------
  searchBlog: async (req, res) => {
    try {
      const search = req.query.search || "";

      const blogs = await blogModel
        .find({ title: { $regex: search, $options: "i" } })
        .populate("author", "userName");

      helper.success(
        res,
        `blogs with "${search}" title fetched successfully`,
        blogs,
      );
    } catch (error) {
      helper.error(res, "something went wrong!", error);
    }
  },

  // -------- like Blog --------
  likeBlog: async (req, res) => {
    try {
      const id = req.user.id;
      const blogId = req.params.blogId;

      const blog = await blogModel.findById(blogId);

      if (!blog) {
        return helper.error(res, "blog not found!", 404);
      }

      const like = await likeModel.create({ user: id, blog: blogId });

      helper.success(res, "blog has been liked.", like);
    } catch (error) {
      if (error.code === 11000) {
        return helper.error(res, "Blog already liked", 400);
      }

      helper.error(res, "something went wrong!", error.message);
    }
  },

  // -------- unlike Blog --------
  unLikeBlog: async (req, res) => {
    try {
      const id = req.user.id;
      const blogId = req.params.blogId;

      const blog = await blogModel.findById(blogId);

      if (!blog) {
        return helper.error(res, "blog not found!", 404);
      }

      const like = await likeModel.deleteOne({ user: id, blog: blogId });

      if (like.deletedCount === 0) {
        return helper.error(res, "You have not liked this blog", 400);
      }

      helper.success(res, "blog has been unliked.", like);
    } catch (error) {
      helper.error(res, "something went wrong!", error.message);
    }
  },
};

export default blog;
