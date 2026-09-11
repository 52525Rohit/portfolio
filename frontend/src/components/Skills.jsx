import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { revealHeading, revealUp, reduced } from "../lib/anim";
import { useContent } from "../hooks/useContent";

export default function Skills() {
  const { skills } = useContent();
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealHeading(root.current.querySelector(".skills__head h2"), root.current);
      revealUp([".skills__head .tag"], root.current, { start: "top 75%" });

      gsap.utils.toArray(".skill").forEach((el, i) => {
        const bar = el.querySelector(".skill__fill");
        const pct = bar.dataset.level;
        const st = { trigger: el, start: "top 90%" };
        if (!reduced) {
          gsap.from(el, {
            y: 24,
            opacity: 0,
            filter: "blur(5px)",
            duration: 0.5,
            delay: (i % 3) * 0.06,
            ease: "power3.out",
            scrollTrigger: st,
          });
        }
        gsap.fromTo(
          bar,
          { width: "0%" },
          { width: pct + "%", duration: 1.2, ease: "power2.out", scrollTrigger: st }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="section skills" ref={root}>
      <div className="wrap">
        <div className="skills__head">
          <span className="tag">MY SKILLS</span>
          <h2>Technologies I Work With</h2>
        </div>
        <div className="skills__grid">
          {skills.map((s) => (
            <div className="skill" key={s.name}>
              <div className="skill__meta">
                <span>{s.name}</span>
                <span className="skill__pct">{s.level}%</span>
              </div>
              <div className="skill__track">
                <div className="skill__fill" data-level={s.level} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
