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
      const { title, category, content, images } = req.body;

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
        images: images,
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

      helper.success(res, "blog deleted successfully.", blogPost);
    } catch (error) {
      helper.error(res, "something went wrong!", error);
    }
  },

  // -------- update blog --------
  updateBlog: async (req, res) => {
    try {
      const id = req.user.id;
      const blogId = req.params.id;
      const { title, category, content, images } = req.body;

      const blogPost = await blogModel.findOneAndUpdate(
        { _id: blogId, author: id },
        {
          title: title,
          content: content,
          category: category,
          images: images,
        },
        {
          new: true,
        },
      );

      if (!blogPost) {
        return helper.error(res, "Blog not found!");
      }

      helper.success(res, "blog updated successfully.", blogPost);
    } catch (error) {
      console.log("UPDATE ERROR:", error);
      helper.error(res, "something went wrong!", error);
    }
  },
};

export default blog;
