import fs from "fs";
import path from "path";

import userModel from "../model/users.js";
import blogModel from "../model/blogs.js";
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

      const blogDetail = await blogModel
        .findById(blogId)
        .populate("author", "userName profilePhoto");

      helper.success(res, "all blogs fetched successfully.", blogDetail);
    } catch (error) {
      helper.error(res, "something went wrong!", error);
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
        return helper.error(res, "At least one category is required");
      }

      if (category.length > 3) {
        return helper.error(res, "Maximum 3 categories allowed");
      }

      if (!req.files || req.files.length === 0) {
        return helper.error(res, "At least one image is required");
      }

      const user = await userModel.findById(id);
      if (!user) {
        return helper.error(res, "User not found");
      }

      const images = req.files.map((file) => `/uploads/${file.filename}`);

      const blogPost = await blogModel.create({
        title,
        content,
        category,
        images,
        author: user._id,
      });

      return helper.success(res, "Blog created successfully.", blogPost);
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
        helper.error(res, "user not found!");
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
        return helper.error(res, "Blog not found or not authorized!");
      }

      if (blog.images && blog.images.length > 0) {
        blog.images.forEach((imagePath) => {
          const fullPath = path.join(process.cwd(), "public", imagePath);

          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        });
      }

      await blog.deleteOne();

      return helper.success(res, "Blog deleted successfully.", blogId);
    } catch (error) {
      return helper.error(res, "Something went wrong!", error);
    }
  },

  // -------- update blog --------
  // updateBlog: async (req, res) => {
  //   try {
  //     const userId = req.user.id;
  //     const blogId = req.params.id;

  //     let { title, category, content } = req.body;

  //     const blog = await blogModel.findOne({
  //       _id: blogId,
  //       author: userId,
  //     });

  //     if (!blog) {
  //       return helper.error(res, "Blog not found!");
  //     }

  //     if (typeof category === "string") {
  //       category = [category];
  //     }

  //     if (!Array.isArray(category) || category.length === 0) {
  //       return helper.error(res, "At least one category is required");
  //     }

  //     if (category.length > 3) {
  //       return helper.error(res, "Maximum 3 categories allowed");
  //     }

  //     const updateData = {
  //       title: title !== undefined ? title : blog.title,
  //       category: category !== undefined ? category : blog.category,
  //       content: content !== undefined ? content : blog.content,
  //       images: blog.images,
  //     };

  //     if (req.files && req.files.length > 0) {
  //       updateData.images = req.files.map(
  //         (file) => `/uploads/${file.filename}`,
  //       );
  //     }

  //     const blogPost = await blogModel.findOneAndUpdate(
  //       { _id: blogId, author: userId },
  //       updateData,
  //       { new: true },
  //     );

  //     return helper.success(res, "Blog updated successfully.", blogPost);
  //   } catch (error) {
  //     console.error(error); // always log real error
  //     return helper.error(res, "Something went wrong!", error.message);
  //   }
  // },

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
        return helper.error(res, "Blog not found!");
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
          blog.images.forEach((imagePath) => {
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

  // -------- all authors --------
  allAuthors: async (req, res) => {
    try {
      const authorIds = await blogModel.distinct("author");

      const authors = await userModel
        .find({ _id: { $in: authorIds } })
        .select("-password -email");

      helper.success(res, "all authors fetched successfully!", authors);
    } catch (error) {
      helper.error(res, "something went wrong!", error);
    }
  },

  // -------- author detail --------
  singleAuthorDetail: async (req, res) => {
    try {
      const authorId = req.params.id;

      const authorDetail = await userModel
        .findOne({ _id: authorId })
        .select("-password -email");

      if (!authorDetail) {
        helper.error(res, "author did not exist!", error);
      }

      const blogs = await blogModel
        .find({ author: authorId })
        .populate("author", "userName");

      helper.success(res, "author detail fetched successfully!", {
        author: authorDetail,
        blogs,
        totalBlogs: blogs.length,
      });
    } catch (error) {
      helper.error(res, "something went wrong!", error);
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
};

export default blog;
