import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { NAV } from "../data";
import { magnetic, reduced } from "../lib/anim";
import ThemeToggle from "./ThemeToggle";

const IDS = NAV.map((n) => n.toLowerCase());

export default function Navbar() {
  const ref = useRef(null);
  const barRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.from(ref.current, {
          y: -40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 2.1,
        });
      }
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });
    });

    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // scroll-spy: which section is in view -> active link + URL hash
    const sections = IDS.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id);
            history.replaceState(null, "", `#${e.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));

    const cleanups = Array.from(
      ref.current.querySelectorAll(".btn, .nav__brand")
    ).map((b) => magnetic(b, 0.2));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <header ref={ref} className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner">
        <a href="#home" className="nav__brand">
          <span className="nav__brand-mark">&lt;/&gt;</span> Rohit Kumar
        </a>
        <nav className="nav__links">
          {NAV.map((item) => {
            const id = item.toLowerCase();
            return (
              <a
                key={item}
                href={`#${id}`}
                className={active === id ? "is-active" : undefined}
                aria-current={active === id ? "page" : undefined}
              >
                {item}
              </a>
            );
          })}
        </nav>
        <div className="nav__end">
          <ThemeToggle />
          <a href="#contact" className="btn btn--primary nav__cta">
            Hire Me <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
      <span ref={barRef} className="nav__progress" />
    </header>
  );
}
