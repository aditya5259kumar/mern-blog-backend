import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("mongoDB connected successfully.");
  } catch (error) {
    console.log("failed to connect mongoDB!");
    process.exit(1);
  }
};

export default connectDB;
