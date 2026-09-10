import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { reduced } from "../lib/anim";

const ITEMS = [
  "JavaScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "Tailwind CSS",
  "REST APIs",
  "Git & GitHub",
];

export default function Marquee() {
  const track = useRef(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.to(track.current, {
        xPercent: -50,
        duration: 24,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="marquee" aria-hidden>
      <div className="marquee__track" ref={track}>
        {[...ITEMS, ...ITEMS].map((t, i) => (
          <span key={i} className="marquee__item">
            {t}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
