import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { PROJECTS } from "../data";
import { revealHeading, revealUp, reduced } from "../lib/anim";

export default function Projects() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealHeading(root.current.querySelector(".projects__head h2"), root.current);
      revealUp([".projects__head .tag"], root.current, { start: "top 75%" });

      if (!reduced) {
        gsap.from(".project", {
          y: 60,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".projects__grid", start: "top 82%" },
        });

        // parallax the screenshot inside each frame
        gsap.utils.toArray(".project__preview img").forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: img.closest(".project"),
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  const onMove = (e) => {
    if (reduced) return;
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card, {
      rotateY: x * 7,
      rotateX: -y * 7,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 900,
    });
  };
  const onLeave = (e) =>
    gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });

  return (
    <section id="projects" className="section projects" ref={root}>
      <div className="wrap">
        <div className="projects__head">
          <span className="tag">FEATURED PROJECTS</span>
          <h2>Some of My Recent Work</h2>
        </div>
        <div className="projects__grid">
          {PROJECTS.map((p) => (
            <article
              className="project"
              key={p.no}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
            >
              <a
                className="project__preview"
                href={p.link}
                target="_blank"
                rel="noreferrer"
              >
                <img src={p.thumb} alt={`${p.title} screenshot`} loading="lazy" />
                <span className="project__no">{p.no}</span>
                <span className="project__open">Open ↗</span>
              </a>
              <div className="project__body">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <ul className="project__tags">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="project__link"
                >
                  Live Demo <span aria-hidden>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
