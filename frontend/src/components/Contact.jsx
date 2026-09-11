import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SOCIALS } from "../data";
import { magnetic, revealHeading, revealUp } from "../lib/anim";
import { useContactForm } from "../hooks/useContactForm";
import Toast from "./Toast";
import ResumeModal from "./ResumeModal";

const MAIL = "rohitkumarrawani6@gmail.com";
const PHONE_HREF = "tel:+917992460569";
const PHONE_TEXT = "+91 79924 60569";

export default function Contact() {
  const root = useRef(null);
  const { toast, closeToast, onSubmit } = useContactForm();
  const [resumeOpen, setResumeOpen] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealHeading(
        root.current.querySelector(".contact__left h2"),
        root.current,
      );
      revealUp(
        [
          ".contact__left .tag",
          ".contact__left p",
          ".contact__details",
          ".contact__actions",
          ".contact__form",
        ],
        root.current,
        { start: "top 78%", stagger: 0.1 },
      );
    }, root);

    const cleanups = Array.from(root.current.querySelectorAll(".btn")).map(
      (b) => magnetic(b, 0.2),
    );

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
          <h2>Have a project or role in mind?</h2>
          <p>
            I'm open to Full-Stack / JavaScript / React / Node roles and
            freelance work. Send a message and I'll get back to you.
          </p>

          <ul className="contact__details">
            <li>
              <span className="contact__details-label">Email</span>
              <a href={`mailto:${MAIL}`}>{MAIL}</a>
            </li>
            <li>
              <span className="contact__details-label">Phone</span>
              <a href={PHONE_HREF}>{PHONE_TEXT}</a>
            </li>
          </ul>

          <div className="contact__actions">
            {SOCIALS.filter((s) => s.href.startsWith("http")).map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="btn btn--ghost"
              >
                {s.label} <span aria-hidden>↗</span>
              </a>
            ))}
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setResumeOpen(true)}
            >
              Resume <span aria-hidden>↓</span>
            </button>
          </div>
        </div>

        <form className="contact__form" onSubmit={onSubmit}>
          <label className="field">
            <span>Name</span>
            <input name="name" type="text" required placeholder="Your name" />
          </label>
          <label className="field">
            <span>Email</span>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
            />
          </label>
          <label className="field">
            <span>Message</span>
            <textarea
              name="message"
              rows="4"
              required
              placeholder="Tell me a bit about it…"
            />
          </label>
          <button type="submit" className="btn btn--primary contact__send">
            Send Message <span aria-hidden>↗</span>
          </button>
        </form>
      </div>
      <Toast toast={toast} onClose={closeToast} />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
