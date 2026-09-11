import { useContent } from "../hooks/useContent";

export default function Footer() {
  const { nav } = useContent();
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <a href="#home" className="nav__brand">
          <span className="nav__brand-mark">&lt;/&gt;</span> Rohit Kumar
        </a>
        <nav className="footer__links">
          {nav.map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`}>
              {n}
            </a>
          ))}
        </nav>
        <p>© {new Date().getFullYear()} Rohit Kumar. All rights reserved.</p>
      </div>
    </footer>
  );
}
