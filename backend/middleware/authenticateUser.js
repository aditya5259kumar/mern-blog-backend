import jwt from "jsonwebtoken";
import userModel from "../model/users.js";
import helper from "../utils/helper.js";

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // console.log("authHeader--------------", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      helper.error(res, "toekn missing or invalid!");
    }

    const bearer = authHeader.split(" ");
    const token = bearer[1];

    // console.log("token------", token);

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(verifyToken.id);

    // console.log("user------", user);

    if (!user) {
      return helper.error(res, "User no longer exists");
    }

    req.user = user;
    next();
  } catch (error) {
    helper.error(res, "invalid or token expired!", error);
  }
};

export default authenticateUser;
