import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { STATS } from "../data";
import { revealHeading, revealUp, reduced } from "../lib/anim";

export default function About() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealHeading(root.current.querySelector(".about__text h2"), root.current);
      revealUp(
        [".about__text .tag", ".about__text p", ".about__text .btn"],
        root.current,
        { start: "top 72%" }
      );

      gsap.utils.toArray(".stat").forEach((el, i) => {
        const numEl = el.querySelector(".stat__num");
        const target = +numEl.dataset.value;
        const suffix = numEl.dataset.suffix || "";
        const fmt = target % 1 ? (v) => v.toFixed(1) : (v) => Math.round(v);
        const obj = { v: 0 };
        const st = { trigger: el, start: "top 85%" };

        if (!reduced) {
          gsap.from(el, {
            y: 28,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.6,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: st,
          });
        }
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          delay: i * 0.08 + 0.15,
          ease: "power2.out",
          scrollTrigger: st,
          onUpdate: () => {
            numEl.textContent = fmt(obj.v) + suffix;
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section about" ref={root}>
      <div className="wrap about__grid">
        <div className="about__text">
          <span className="tag">ABOUT ME</span>
          <h2>Turning ideas into full-stack products</h2>
          <p>
            I turn business requirements into clean, functional, and scalable web
            applications — building frontend experiences, developing REST APIs,
            handling databases, and integrating third-party services like payment
            gateways and webhooks. I care about strong JavaScript fundamentals,
            better architecture, and writing maintainable code.
          </p>
          <a href="#skills" className="btn btn--ghost">
            See My Skills <span aria-hidden>↗</span>
          </a>
        </div>

        <div className="about__stats">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <span
                className="stat__num"
                data-value={s.value}
                data-suffix={s.suffix}
              >
                0{s.suffix}
              </span>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
