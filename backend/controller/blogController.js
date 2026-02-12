import userModel from "../model/users.js";
import blogModel from "../model/blogs.js";
import helper from "../utils/helper.js";

const blog = {
  // -------- read blog --------

  allBlogs: async (req, res) => {
    try {
      const id = req.user.id;

      const user = await userModel.findById(id);

      if (!user) {
        helper.error(res, "user not found!");
      }

      const allBlogs = await blogModel.find();

      helper.success(res, "all blogs fetched successfully.", allBlogs);
    } catch (error) {
      helper.error(res, "something went wrong!", error);
    }
  },

  // -------- create blog --------
  createBlog: async (req, res) => {
    try {
      const id = req.user.id;
      const { title, content, category } = req.body;

      console.log("req.user--------", req.user);

      if (!title || !content || !category) {
        helper.error(res, "title, content, and category is required");
      }

      const user = await userModel.findById(id);

      if (!user) {
        helper.error(res, "user not found!");
      }

      const blogPost = await blogModel.create({
        title: title,
        content: content,
        category: category,
        author: user._id,
      });

      helper.success(res, "blog created successfully.", blogPost);
    } catch (error) {
      helper.error(res, "something went wrong!", error);
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
      const id = req.user.id;
      const blogId = req.params;

      const user = await userModel.findById(id);

      if (!user) {
        helper.error(res, "user not found!");
      }

      const myBlogs = blogModel.find({ author: user._id });

      if (!blogExist) {
        helper.error(res, "blog post not found!");
      }

      await blogModel.deleteOne({ blogId });

      helper.success(res, "blog deleted successfully.");
    } catch (error) {
      helper.error(res, "something went wrong!", error);
    }
  },
};

export default blog;
