"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const TG_LINK = "https://t.me/+oMvBwUP3_xNmNDM8";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav>
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <div className="logo-main">
            Guadagno Smart<span className="pro">Pro</span>
          </div>
          <div className="logo-slogan">Strategie reali · Zero guru · Solo numeri</div>
        </Link>

        <ul className="nav-links">
          <li className={pathname === "/" ? "active" : ""}>
            <Link href="/">Home</Link>
          </li>
        </ul>

        <Link href="/cerca" className="nav-search-icon">
          <svg viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </Link>

        <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="nav-cta">
          Entra nell&apos;Hub →
        </a>

        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/cerca" onClick={() => setMenuOpen(false)}>Cerca</Link>
        <a href={TG_LINK} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
          Entra nell&apos;Hub →
        </a>
      </div>
    </nav>
  );
}
