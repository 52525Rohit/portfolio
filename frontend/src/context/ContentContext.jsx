import { useEffect, useState } from "react";
import { getContent } from "../services/contentService";
import { DEFAULTS, ContentContext } from "./contentDefaults";
import { NAV, TECH, STATS, SKILLS, PROJECTS, SOCIALS } from "../data";

export function ContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULTS);

  useEffect(() => {
    getContent()
      .then((data) => {
        setContent({
          nav: data.nav?.length ? data.nav : NAV,
          tech: data.tech?.length ? data.tech : TECH,
          stats: data.stats?.length ? data.stats : STATS,
          skills: data.skills?.length ? data.skills : SKILLS,
          projects: data.projects?.length ? data.projects : PROJECTS,
          socials: data.socials?.length ? data.socials : SOCIALS,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
}
