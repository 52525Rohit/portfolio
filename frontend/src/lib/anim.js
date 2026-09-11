import { gsap } from "gsap";

export const reduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function splitWords(el) {
  if (!el) return [];
  if (el.dataset.split) return Array.from(el.querySelectorAll(".w-inner"));
  const words = el.textContent.trim().split(/\s+/);
  el.textContent = "";
  el.dataset.split = "1";
  const inners = [];
  words.forEach((w, i) => {
    const mask = document.createElement("span");
    mask.className = "w-mask";
    const inner = document.createElement("span");
    inner.className = "w-inner";
    inner.textContent = w;
    mask.appendChild(inner);
    el.appendChild(mask);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    inners.push(inner);
  });
  return inners;
}

export function revealHeading(el, trigger) {
  if (reduced || !el) return;
  gsap.from(el, {
    yPercent: 18,
    opacity: 0,
    clipPath: "inset(0 0 100% 0)",
    duration: 0.95,
    ease: "power4.out",
    scrollTrigger: { trigger: trigger || el, start: "top 82%", once: true },
  });
}

export function revealUp(targets, trigger, opts = {}) {
  if (reduced) return;
  gsap.from(targets, {
    y: opts.y ?? 28,
    opacity: 0,
    filter: "blur(6px)",
    duration: opts.duration ?? 0.7,
    stagger: opts.stagger ?? 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: trigger,
      start: opts.start ?? "top 80%",
      once: true,
    },
  });
}

export function magnetic(el, strength = 0.35) {
  if (reduced || !el) return () => {};
  const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
  const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
  const move = (e) => {
    const r = el.getBoundingClientRect();
    xTo((e.clientX - (r.left + r.width / 2)) * strength);
    yTo((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    xTo(0);
    yTo(0);
  };
  el.addEventListener("pointermove", move);
  el.addEventListener("pointerleave", reset);
  return () => {
    el.removeEventListener("pointermove", move);
    el.removeEventListener("pointerleave", reset);
  };
}
