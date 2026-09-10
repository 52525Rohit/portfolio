import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { SOCIALS } from "../data";
import { magnetic, revealHeading, revealUp } from "../lib/anim";

const LOOKING_FOR = [
  "Full-Stack Developer",
  "JavaScript Developer",
  "React.js Developer",
  "Node.js Developer",
];

export default function Contact() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealHeading(root.current.querySelector(".contact__left h2"), root.current);
      revealUp(
        [".contact__left .tag", ".contact__left p", ".contact__actions", ".contact__card"],
        root.current,
        { start: "top 78%", stagger: 0.12 }
      );
    }, root);

    const cleanups = root.current
      ? Array.from(root.current.querySelectorAll(".contact__actions .btn")).map((b) =>
          magnetic(b, 0.25)
        )
      : [];

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section id="contact" className="section contact" ref={root}>
      <div className="wrap contact__inner">
        <div className="contact__left">
          <span className="tag">LET'S CONNECT</span>
          <h2>Open to new opportunities</h2>
          <p>
            I'm looking for roles where I can contribute to real-world projects,
            learn from experienced developers, and grow into an expert Full-Stack
            Developer. If that sounds like a fit, let's talk.
          </p>
          <div className="contact__actions">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="btn btn--ghost"
              >
                {s.label} <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="contact__card">
          <h3>What I'm aiming for</h3>
          <p>
            Becoming an expert Full-Stack Developer with strong fundamentals in
            JavaScript, backend development, databases, system design, APIs,
            testing, and deployment — capable of shipping production-ready,
            scalable applications.
          </p>
          <span className="contact__card-label">Looking for</span>
          <ul className="contact__roles">
            {LOOKING_FOR.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
