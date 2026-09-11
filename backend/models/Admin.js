import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  resetTokenHash: String,
  resetTokenExpiry: Date,
});

export default mongoose.model("Admin", adminSchema);
