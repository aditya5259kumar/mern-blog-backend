import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/blog_app");
    console.log("mongoDB connected successfully.");
  } catch (error) {
    console.log("failed to connect mongoDB!");
    process.exit(1);
  }
};

export default connectDB;
