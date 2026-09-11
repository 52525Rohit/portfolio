import mongoose from "mongoose";

export default async function connectDB(uri) {
  if (!uri) {
    console.error("Missing MONGODB_URI in .env");
    process.exit(1);
  }
  await mongoose.connect(uri);
  console.log("MongoDB Connected Successfully");
}
