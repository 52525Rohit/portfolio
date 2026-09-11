import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import Content from "../models/Content.js";

const INITIAL_CONTENT = {
  profileImage: "/profile.png",
  resume: "/resume.pdf",
  nav: ["Home", "About", "Skills", "Projects", "Contact"],
  tech: ["HTML", "CSS", "JS", "React", "Next", "Node", "Mongo"],
  stats: [
    { value: 1.6, suffix: "+", label: "Years of Experience" },
    { value: 20, suffix: "+", label: "Projects Shipped" },
    { value: 9, suffix: "+", label: "Technologies" },
    { value: 100, suffix: "%", label: "Commitment to Learning" },
  ],
  skills: [
    { name: "JavaScript", level: 88 },
    { name: "React.js", level: 88 },
    { name: "Next.js", level: 85 },
    { name: "Node.js", level: 82 },
    { name: "Express.js", level: 82 },
    { name: "MongoDB", level: 80 },
    { name: "MySQL", level: 75 },
    { name: "Tailwind CSS", level: 88 },
    { name: "REST APIs", level: 85 },
  ],
  projects: [
    {
      no: "01",
      title: "Book Store Application",
      desc: "A full-stack e-commerce-style book store where users browse books and check out through a modern interface. Includes payment gateway and webhook integration.",
      tags: ["Next.js", "Node.js", "Express", "MongoDB"],
      link: "https://book-store-jet-six.vercel.app/",
      thumb: "/projects/proj-01.png",
    },
    {
      no: "02",
      title: "Quiz Application",
      desc: "An interactive quiz app with a simple, engaging flow — question rendering, answer selection, and result handling on a fully responsive interface.",
      tags: ["React.js", "Next.js", "Tailwind CSS", "JavaScript"],
      link: "https://quiz-application-9vbg.vercel.app/",
      thumb: "/projects/proj-02.png",
    },
    {
      no: "03",
      title: "Render Tracker",
      desc: "A web app for tracking and managing data through a clean dashboard — API integration, modern UI, and a responsive layout.",
      tags: ["React.js", "Next.js", "Node.js", "JavaScript"],
      link: "https://render-tracker-blush.vercel.app/",
      thumb: "/projects/proj-03.png",
    },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/52525Rohit" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rohit-kumar-630475153?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
    { label: "Email", href: "mailto:rohitkumarrawani6@gmail.com" },
    { label: "Phone", href: "tel:+917992460569" },
  ],
};

export default async function seed() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (ADMIN_EMAIL && ADMIN_PASSWORD) {
    const email = ADMIN_EMAIL.trim().toLowerCase();
    const exists = await Admin.findOne({ email });
    if (!exists) {
      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
      await Admin.create({ email, passwordHash });
      console.log("Admin account seeded:", email);
    }
  }

  const existing = await Content.findById("site").lean();
  if (!existing) {
    await Content.create({ _id: "site", ...INITIAL_CONTENT });
    console.log("Site content seeded");
  } else if (!existing.profileImage || !existing.resume) {
    await Content.updateOne(
      { _id: "site" },
      {
        $set: {
          profileImage: existing.profileImage || INITIAL_CONTENT.profileImage,
          resume: existing.resume || INITIAL_CONTENT.resume,
        },
      },
    );
    console.log("Backfilled profileImage/resume on existing content");
  }
}
