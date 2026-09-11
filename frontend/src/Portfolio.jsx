import { useCallback, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { reduced } from "./lib/anim";
import { pathForId, idForPath } from "./lib/router";
import { ContentProvider } from "./context/ContentContext";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const [ready, setReady] = useState(reduced);

  useLayoutEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      if (hash.length < 2) return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -72, duration: 1.1 });
      history.pushState(null, "", pathForId(hash.slice(1)));
    };
    document.addEventListener("click", onClick);

    const deepLinkId = idForPath(location.pathname);
    if (deepLinkId !== "home") {
      const el = document.getElementById(deepLinkId);
      if (el)
        requestAnimationFrame(() =>
          lenis.scrollTo(el, { offset: -72, immediate: true }),
        );
    }

    const onPopState = () => {
      const el = document.getElementById(idForPath(location.pathname));
      if (el) lenis.scrollTo(el, { offset: -72, duration: 1.1 });
    };
    window.addEventListener("popstate", onPopState);

    const id = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPopState);
      gsap.ticker.remove(raf);
      lenis.destroy();
      clearTimeout(id);
    };
  }, []);

  const onLoaderDone = useCallback(() => {
    setReady(true);
    ScrollTrigger.refresh();
  }, []);

  return (
    <ContentProvider>
      {!reduced && <Loader onDone={onLoaderDone} />}
      <Navbar />
      <main>
        <Hero start={ready} />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </ContentProvider>
  );
}
