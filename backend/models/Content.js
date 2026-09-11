import mongoose from "mongoose";

// Single-document collection — everything the public site renders that used
// to live in the frontend's static data.js, now editable from the admin dashboard.
const contentSchema = new mongoose.Schema(
  {
    _id: { type: String, default: "site" },
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
