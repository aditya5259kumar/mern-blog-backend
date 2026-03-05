import mongoose from "mongoose";

const viewSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
},
{
  timestamps: true,
}
);

// one user can view one blog only once
viewSchema.index({ user: 1, blog: 1 }, { unique: true });

const View = mongoose.model("View", viewSchema);

export default View;