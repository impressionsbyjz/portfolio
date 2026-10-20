"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.75);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`site-header${scrolled ? " is-solid" : " is-hero"}`}>
        <div className="header-inner wrap">
          <Link className="brand-mark" href="/" aria-label="JAS — back to top">
            <div className="w-12 h-12 rounded-full bg-brand-surface flex items-center justify-center">JAS</div>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link href="/portfolio">Albums</Link>
            <Link href="/films">Films</Link>
            <Link href="/services">Services</Link>
            <Link href="/testimonials">Kind words</Link>
            <Link href="/faq">FAQ</Link>
          </nav>
          <Button variant="ghost" className="header-cta" asChild>
            <Link href="/contact">Enquire <ArrowUpRight aria-hidden="true" /></Link>
          </Button>
          <Button variant="ghost" size="sm" className="menu-trigger" aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
            <span>{menuOpen ? "Close" : "Menu"}</span>
          </Button>
        </div>
      </header>
      <nav id="mobile-nav" className={`mobile-nav${menuOpen ? " is-open" : ""}`} aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        <div>
          {[
            ["Albums", "/portfolio"],
            ["Films", "/films"],
            ["Services", "/services"],
            ["Kind words", "/testimonials"],
            ["FAQ", "/faq"],
            ["Enquire", "/contact"],
          ].map(([label, href]) => (
            <Link key={href} href={href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
