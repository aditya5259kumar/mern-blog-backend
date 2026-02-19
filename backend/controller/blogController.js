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
        .populate("author", "userName");

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

      const images = req.files.map((file) => `/uploads/${file.filename}`);

      // console.log("req.body--------", req.body);
      // console.log("req.user--------", req.user);
      // console.log("images--------", images);

      if (!title || !content || !category) {
        return helper.error(res, "title, content, and category is required");
      }

      const user = await userModel.findById(id);

      if (!user) {
        return helper.error(res, "user not found!");
      }

      const blogPost = await blogModel.create({
        title: title,
        content: content,
        category: category,
        images: images,
        author: user._id,
      });

      return helper.success(res, "blog created successfully.", blogPost);
    } catch (error) {
      return helper.error(res, "something went wrong!", error.message);
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

      const result = await blogModel.deleteOne({
        _id: blogId,
        author: userId,
      });

      console.log("result---------", result);
      if (result.deletedCount === 0) {
        helper.error(res, "Blog not found or not authorized!", error);
      }

      helper.success(res, "blog deleted successfully.", blogId);
    } catch (error) {
      helper.error(res, "something went wrong!", error);
    }
  },

  // -------- update blog --------
  updateBlog: async (req, res) => {
    try {
      const userId = req.user.id;
      const blogId = req.params.id;
      const { title, category, content } = req.body;

      const blog = await blogModel.findOne({
        _id: blogId,
        author: userId,
      });

      if (!blog) {
        return helper.error(res, "Blog not found!");
      }

      const updateData = {
        title,
        category,
        content,
        images: blog.images,
      };

      if (req.files && req.files.length > 0) {
        updateData.images = req.files.map(
          (file) => `/uploads/${file.filename}`,
        );
      }

      const blogPost = await blogModel.findOneAndUpdate(
        { _id: blogId, author: userId },
        updateData,
        { new: true },
      );

      helper.success(res, "Blog updated successfully.", blogPost);
    } catch (error) {
      helper.error(res, "Something went wrong!", error);
    }
  },
};

export default blog;
