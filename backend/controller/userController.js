import userModel from "../model/users.js";
import blogModel from "../model/blogs.js";
import helper from "../utils/helper.js";
import fs from "fs";
import path from "path";

const userController = {
  // my profile
  myProfile: async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await userModel.findById(userId).select("-password");

      if (!user) {
        return helper.error(res, "User not found.");
      }

      const blogs = await blogModel
        .find({ author: userId })
        .populate("author", "userName profilePhoto");

      return helper.success(res, "My profile fetched successfully.", {
        user,
        blogs,
        totalBlogs: blogs.length,
      });
    } catch (error) {
      return helper.error(res, "Something went wrong!", error.message);
    }
  },

  // update profile
  updateProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const { name, bio } = req.body;

      const user = await userModel.findById(userId);

      if (!user) {
        return helper.error(res, "User not found!");
      }

      const updateData = {
        name: name !== undefined ? name : user.name,
        bio: bio !== undefined ? bio : user.bio,
        profilePhoto: user.profilePhoto,
      };

      if (req.file) {
        if (user.profilePhoto) {
          const fullPath = path.join(
            process.cwd(),
            "public",
            user.profilePhoto,
          );

          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        }

        updateData.profilePhoto = `/uploads/${req.file.filename}`;
      }

      const updatedUser = await userModel
        .findByIdAndUpdate(userId, updateData, { new: true })
        .select("-password");

      return helper.success(res, "Profile updated successfully.", updatedUser);
    } catch (error) {
      return helper.error(res, "Something went wrong!", error.message);
    }
  },
};

export default userController;
