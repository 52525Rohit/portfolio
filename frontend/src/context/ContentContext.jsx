import { useEffect, useState } from "react";
import { getContent } from "../services/contentService";
import { DEFAULTS, ContentContext } from "./contentDefaults";
import { NAV, TECH, STATS, SKILLS, PROJECTS, SOCIALS } from "../data";

const POLL_MS = 15000;

export function ContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULTS);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      getContent()
        .then((data) => {
          if (cancelled) return;
          // Fall back per-field so a partially empty DB doc doesn't blank out a section.
          setContent({
            profileImage: data.profileImage || DEFAULTS.profileImage,
            resume: data.resume || DEFAULTS.resume,
            nav: data.nav?.length ? data.nav : NAV,
            tech: data.tech?.length ? data.tech : TECH,
            stats: data.stats?.length ? data.stats : STATS,
            skills: data.skills?.length ? data.skills : SKILLS,
            projects: data.projects?.length ? data.projects : PROJECTS,
            socials: data.socials?.length ? data.socials : SOCIALS,
          });
        })
        .catch((err) => console.error("Failed to load site content, using static defaults:", err));
    };

    load();
    // Picks up admin edits without a manual refresh — no live-push infra needed
    // for a personal portfolio's traffic; a short poll is plenty.
    const id = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}
