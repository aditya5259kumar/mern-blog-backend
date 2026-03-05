import fs from "fs";
import path from "path";
import sanitizeHtml from "sanitize-html";

import userModel from "../model/users.js";
import blogModel from "../model/blogs.js";
import likesModel from "../model/likes.js";
import viewModel from "../model/views.js";
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
      const userId = req.user.id;

      const blogDetail = await blogModel
        .findById(blogId)
        .populate("author", "userName profilePhoto");

      const likeExist = await likesModel.findOne({
        user: userId,
        blog: blogId,
      });

      const isLiked = !!likeExist;

      helper.success(res, "blog fetched successfully.", {
        ...blogDetail.toObject(),
        isLiked,
      });
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

      const cleanContent = sanitizeHtml(content, {
        allowedTags: [
          "p",
          "b",
          "i",
          "em",
          "strong",
          "h1",
          "h2",
          "h3",
          "ul",
          "ol",
          "li",
          "blockquote",
          "code",
          "a",
          "br",
          // "span",
        ],
        allowedAttributes: {
          a: ["href", "target"],
        },
        allowedSchemes: ["http", "https", "mailto"],
      });

      const cleanTitle = sanitizeHtml(title, {
        allowedTags: [],
        allowedAttributes: {},
      });

      const blogPost = await blogModel.create({
        title: cleanTitle,
        content: cleanContent,
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

      let cleanContent = blog.content;
      let cleanTitle = blog.title;

      if (content !== undefined) {
        cleanContent = sanitizeHtml(content, {
          allowedTags: [
            "p",
            "b",
            "i",
            "em",
            "strong",
            "h1",
            "h2",
            "h3",
            "ul",
            "ol",
            "li",
            "blockquote",
            "code",
            "a",
            "br",
            // "span",
          ],
          allowedAttributes: {
            a: ["href", "target"],
          },
          allowedSchemes: ["http", "https", "mailto"],
        });
      }

      if (title !== undefined) {
        cleanTitle = sanitizeHtml(title, {
          allowedTags: [],
          allowedAttributes: {},
        });
      }

      const updateData = {
        title: cleanTitle,
        category: category !== undefined ? category : blog.category,
        content: cleanContent,
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

      if (blogs.length === 0) {
        return helper.error(res, "no blogs with this category!");
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
        `blogs with "${search}" title fetched successfully.`,
        blogs,
      );
    } catch (error) {
      helper.error(res, "something went wrong!", error);
    }
  },

  // -------- toggle like blog --------
  toggleLikeBlog: async (req, res) => {
    try {
      const blogId = req.params.blogId;
      const userId = req.user.id;

      const likeExist = await likesModel.findOne({
        user: userId,
        blog: blogId,
      });

      // dislike
      if (likeExist) {
        await likesModel.deleteOne({
          user: userId,
          blog: blogId,
        });

        await blogModel.findByIdAndUpdate(blogId, {
          $inc: { likesCount: -1 },
        });

        const updatedBlog = await blogModel.findById(blogId);

        return helper.success(res, "blog unliked successfully.", {
          blog: updatedBlog,
          isLiked: false,
        });
      }

      // like
      await likesModel.create({
        user: userId,
        blog: blogId,
      });

      await blogModel.findByIdAndUpdate(blogId, {
        $inc: { likesCount: 1 },
      });

      const updatedBlog = await blogModel.findById(blogId);

      return helper.success(res, "blog liked successfully.", {
        blog: updatedBlog,
        isLiked: true,
      });
    } catch (error) {
      return helper.error(res, "something went wrong!", error.message);
    }
  },

  // -------- blog views --------
  viewBlog: async (req, res) => {
    try {
      const blogId = req.params.blogId;
      const userId = req.user.id;

      const viewExist = await viewModel.findOne({
        user: userId,
        blog: blogId,
      });

      if (viewExist) {
        const blog = await blogModel.findById(blogId);
        return helper.success(res, "view already counted", blog);
      }

      await viewModel.create({
        user: userId,
        blog: blogId,
      });

      const updatedBlog = await blogModel.findByIdAndUpdate(
        blogId,
        { $inc: { views: 1 } },
        { new: true },
      );

      return helper.success(res, "view counted", updatedBlog);
    } catch (error) {
      return helper.error(res, "something went wrong", error.message);
    }
  },
};

export default blog;
