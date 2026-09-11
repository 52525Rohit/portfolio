import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    _id: { type: String, default: "site" },
    profileImage: String,
    resume: String,
    nav: [String],
    tech: [String],
    stats: [{ value: Number, suffix: String, label: String }],
    skills: [{ name: String, level: Number }],
    projects: [
      {
        no: String,
        title: String,
        desc: String,
        tags: [String],
        link: String,
        thumb: String,
      },
    ],
    socials: [{ label: String, href: String }],
  },
  { timestamps: true },
);

export default mongoose.model("Content", contentSchema);
