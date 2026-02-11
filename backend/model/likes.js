import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: String,
    },
    blog: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Like = mongoose.model("Like", likeSchema);

export default Like;
