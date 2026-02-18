import userModel from "../model/users.js";
import helper from "../utils/helper.js";

const userController = {
  myProfile: async (req, res) => {
    try {
      const id = req.user.id;

      const user = await userModel.findById(id).select("-password");

      if (!user) {
        return helper.error(res, "User not found.");
      }

      return helper.success(res, "My profile fetched successfully.", user);
    } catch (error) {
      return helper.error(res, "Something went wrong!", error.message);
    }
  },
};

export default userController;
