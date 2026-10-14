"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { MagneticLink } from "@/components/ui/MagneticLink";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    document.body.dataset.menuOpen = String(open);
    return () => {
      document.body.dataset.menuOpen = "false";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <a href="#top" className="navbar__logo" aria-label="Phong Nguyen — về đầu trang">
          <span>PN</span>
          <span className="navbar__logo-dot" />
        </a>

        <nav className="navbar__links" aria-label="Điều hướng chính">
          {portfolio.navigation.map((item, index) => (
            <a key={item.href} href={item.href} className="nav-link">
              <span>0{index + 1}</span> {item.label}
            </a>
          ))}
        </nav>

        <div className="navbar__contact">
          <MagneticLink href="#contact" variant="text" icon="down">
            Let&apos;s talk
          </MagneticLink>
        </div>

        <button
          type="button"
          className="navbar__menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${open ? "mobile-menu--open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu__inner">
          <p className="eyebrow">Navigation</p>
          <nav aria-label="Điều hướng mobile">
            {portfolio.navigation.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="mobile-menu__link"
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
              >
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
            <a href="#contact" className="mobile-menu__link" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              <span>04</span>
              Contact
            </a>
          </nav>
          <div className="mobile-menu__footer">
            <span>{portfolio.person.location}</span>
            <a href={`mailto:${portfolio.person.email}`} tabIndex={open ? 0 : -1}>{portfolio.person.email}</a>
          </div>
        </div>
      </div>
    </>
  );
}
