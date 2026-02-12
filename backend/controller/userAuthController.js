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
        helper.error(res, "all fields are required!");
      }

      const userExist = await userModel.findOne({ email });

      if (userExist) {
        helper.error(res, "user with this email is already exist!");
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
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      helper.success(res, "user created successdully.", token);
    } catch (error) {
      helper.error(res, "something went wrong", error);
    }
  },

  // -------- login---------

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        helper.error(res, "email and password is required!");
      }

      const user = await userModel.findOne({ email });

      if (!user) {
        helper.error(res, "user not found! ");
      }

      const hashPassword = await bcrypt.compare(password, user.password);

      if (!hashPassword) {
        helper.error(res, "invalid credentials!");
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      helper.success(res, "user logged in successdully.", token);
    } catch (error) {
      helper.error(res, "something went wrong!", error);
    }
  },
};

export default userAuth;
