import { createContext } from "react";
import { NAV, TECH, STATS, SKILLS, PROJECTS, SOCIALS } from "../data";

export const DEFAULTS = {
  profileImage: "/profile.png",
  resume: "/resume.pdf",
  nav: NAV,
  tech: TECH,
  stats: STATS,
  skills: SKILLS,
  projects: PROJECTS,
  socials: SOCIALS,
};

export const ContentContext = createContext(DEFAULTS);
