import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TECH } from "../data";
import { magnetic, reduced, splitWords } from "../lib/anim";
import profile from "../assets/profile.png";
import ResumeModal from "./ResumeModal";

const CODE = `const developer = {
  name: "Rohit Kumar",
  role: "Full-Stack Developer",
  stack: ["React", "Next.js", "Node"],
  db: ["MongoDB", "MySQL"],
  learning: true
};`;

export default function Hero({ start }) {
  const root = useRef(null);
  const wordsRef = useRef([]);
  const [resumeOpen, setResumeOpen] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const words = [];
      self.selector(".hero__title .line").forEach((l) => {
        words.push(...splitWords(l));
      });
      wordsRef.current = words;

      if (reduced) return;

      gsap.set(words, { yPercent: 115 });
      gsap.set(
        [".hero__eyebrow", ".hero__lead", ".hero__actions .btn", ".hero__tech"],
        { y: 24, opacity: 0 }
      );
      gsap.set(".hero__tech li", { y: 14, opacity: 0 });
      gsap.set(".hero__portrait", { clipPath: "inset(100% 0 0 0)" });
      gsap.set(".hero__card", { y: 40, opacity: 0 });
      gsap.set([".hero__orb", ".hero__orb--2"], { opacity: 0, scale: 0.7 });

      gsap.to(".hero__orb", {
        yPercent: 24,
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero__orb--2", {
        yPercent: -30,
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero__visual", {
        yPercent: 12,
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      gsap.to(".hero__card", { y: "-=14", duration: 3, delay: 3, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".hero__orb", { scale: 1.12, duration: 5, delay: 2, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".hero__orb--2", { scale: 1.2, x: 24, duration: 6, delay: 2, ease: "sine.inOut", repeat: -1, yoyo: true });
    }, root);

    const cleanups = root.current
      ? Array.from(root.current.querySelectorAll(".btn")).map((b) => magnetic(b, 0.3))
      : [];

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  useEffect(() => {
    if (!start || reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to([".hero__orb", ".hero__orb--2"], {
        opacity: (i) => (i ? 0.32 : 0.5),
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
      })
        .to(".hero__eyebrow", { y: 0, opacity: 1, duration: 0.5 }, 0.05)
        .to(
          wordsRef.current,
          { yPercent: 0, duration: 0.7, stagger: 0.045, ease: "power4.out" },
          0.1
        )
        .to(".hero__lead", { y: 0, opacity: 1, duration: 0.5 }, "-=0.4")
        .to(".hero__actions .btn", { y: 0, opacity: 1, duration: 0.45, stagger: 0.08 }, "-=0.3")
        .to(".hero__tech", { y: 0, opacity: 1, duration: 0.4 }, "-=0.25")
        .to(
          ".hero__tech li",
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.04, ease: "back.out(1.7)" },
          "-=0.25"
        )
        .to(
          ".hero__portrait",
          { clipPath: "inset(0% 0 0 0)", duration: 0.9, ease: "power4.inOut" },
          0.35
        )
        .to(".hero__card", { y: 0, opacity: 1, duration: 0.5 }, "-=0.4");
    }, root);
    return () => ctx.revert();
  }, [start]);

  const onMove = (e) => {
    if (reduced) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(".hero__portrait", {
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 900,
    });
  };
  const onLeave = () =>
    gsap.to(".hero__portrait", { rotateY: 0, rotateX: 0, duration: 0.7, ease: "power3.out" });

  return (
    <section id="home" className="hero" ref={root}>
      <div className="hero__grid">
        <div className="hero__content">
          <span className="hero__eyebrow">
            <i className="dot" /> FULL-STACK DEVELOPER
          </span>
          <h1 className="hero__title">
            <span className="line">Hi, I'm Rohit Kumar</span>
            <span className="line line--grad">I build for the web.</span>
          </h1>
          <p className="hero__lead">
            Full-Stack Developer with 1.6+ years of experience, turning ideas into
            modern, responsive web apps with JavaScript, React, Next.js, Node.js
            and MongoDB / MySQL.
          </p>
          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">
              View My Work <span aria-hidden>↗</span>
            </a>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setResumeOpen(true)}
            >
              Download Resume <span aria-hidden>↓</span>
            </button>
          </div>
          <div className="hero__tech">
            <span>STACK I WORK WITH</span>
            <ul>
              {TECH.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hero__visual" onMouseMove={onMove} onMouseLeave={onLeave}>
          <div className="hero__orb" aria-hidden />
          <div className="hero__orb hero__orb--2" aria-hidden />
          <div className="hero__portrait">
            <img src={profile} alt="Rohit Kumar" />
            <span className="hero__badge">
              <i /> Open to opportunities
            </span>
          </div>
          <div className="hero__card">
            <div className="hero__card-bar">
              <span /> <span /> <span />
              <em>developer.js</em>
            </div>
            <pre>
              <code>{CODE}</code>
            </pre>
          </div>
        </div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to about">
        <span />
      </a>
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
