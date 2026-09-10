import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { reduced } from "../lib/anim";

export default function Loader({ onDone }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (reduced) {
      onDone();
      root.current.style.display = "none";
      return;
    }
    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          onDone();
          root.current.style.display = "none";
        },
      });
      tl.to(counter, {
        v: 100,
        duration: 0.7,
        ease: "power2.inOut",
        onUpdate: () => {
          root.current.querySelector(".loader__num").textContent =
            String(Math.round(counter.v)).padStart(3, "0");
        },
      })
        .to(".loader__name span", {
          yPercent: -110,
          duration: 0.45,
          stagger: 0.03,
          ease: "power3.in",
        })
        .to(".loader__bar", { scaleX: 0, transformOrigin: "right", duration: 0.35, ease: "power2.in" }, "<")
        .to(".loader__panel", {
          scaleY: 0,
          transformOrigin: "top",
          duration: 0.55,
          stagger: 0.06,
          ease: "power4.inOut",
        });
    }, root);
    return () => ctx.revert();
  }, [onDone]);

  return (
    <div className="loader" ref={root} aria-hidden>
      <div className="loader__panels">
        <span className="loader__panel" />
        <span className="loader__panel" />
        <span className="loader__panel" />
        <span className="loader__panel" />
        <span className="loader__panel" />
      </div>
      <div className="loader__content">
        <div className="loader__name">
          <span>R</span>
          <span>o</span>
          <span>h</span>
          <span>i</span>
          <span>t</span>
        </div>
        <div className="loader__num">000</div>
      </div>
      <div className="loader__bar" />
    </div>
  );
}
