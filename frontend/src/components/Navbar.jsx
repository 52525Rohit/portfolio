import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { NAV } from "../data";
import { magnetic, reduced } from "../lib/anim";

export default function Navbar() {
  const ref = useRef(null);
  const barRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.from(ref.current, {
          y: -40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: reduced ? 0 : 2.1,
        });
      }

      // scroll progress bar
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });
    });

    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const cleanups = ref.current
      ? Array.from(ref.current.querySelectorAll(".btn, .nav__brand")).map((b) =>
          magnetic(b, 0.2)
        )
      : [];

    return () => {
      window.removeEventListener("scroll", onScroll);
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
          {NAV.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn--primary nav__cta">
          Hire Me <span aria-hidden>↗</span>
        </a>
      </div>
      <span ref={barRef} className="nav__progress" />
    </header>
  );
}
