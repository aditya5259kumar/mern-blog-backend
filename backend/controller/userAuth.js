import userModel from "../model/users.js";
import helper from "../utils/helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userAuth = {
  // -------- signup---------
  signup: async (req, res) => {
    try {
      const { name, userName, email, password, bio, profilePhoto } = req.body;

      if (!name || !userName || !email || !password) {
        helper.error(res, "all fields are required!", error);
      }

      const userExist = await userModel.findOne({ email });

      if (userExist) {
        helper.error(res, "user with this email is already exist!", error);
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const user = await userModel.create({
        name: name,
        userName: userName,
        email: email,
        password: hashPassword,
        bio: bio,
        profilePhoto: profilePhoto,
      });

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECERT,
        { expiresIn: "7d" },
      );

      helper.success(res, "user created successdully.", token);
    } catch (error) {
      console.log(helper);
      helper.error(res, "something went wrong", error);
    }
  },
};

export default userAuth;
