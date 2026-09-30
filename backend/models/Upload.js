import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema(
  {
    _id: String,
    contentType: String,
    data: Buffer,
  },
  { timestamps: true },
);

export default mongoose.model("Upload", uploadSchema);
