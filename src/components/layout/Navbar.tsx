"use client";

import { useEffect, useState } from "react";
import { navigation } from "@/config/site";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/layout/Footer";

type NavbarProps = {
  onOrder: () => void;
};

export function Navbar({ onOrder }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#trang-chu");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = navigation
      .map(({ href }) => document.querySelector(href))
      .filter((section): section is Element => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: "-25% 0px -65%", threshold: [0.1, 0.4, 0.8] },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container nav-shell">
        <Logo />
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Điều hướng chính">
          {navigation.map((item) => (
            <a className={activeSection === item.href ? "is-active" : ""} href={item.href} key={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="button button-small button-primary" type="button" onClick={onOrder}>
            Mua VPS <Icon name="arrow-up-right" />
          </button>
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? "Đóng menu" : "Mở menu"} onClick={() => setMenuOpen((open) => !open)}>
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>
      <div id="main-navigation" className={`mobile-nav ${menuOpen ? "is-open" : ""}`}>
        {navigation.map((item) => (
          <a className={activeSection === item.href ? "is-active" : ""} href={item.href} key={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
        <button className="button button-primary" type="button" onClick={() => { closeMenu(); onOrder(); }}>
          Mua VPS <Icon name="arrow-up-right" />
        </button>
      </div>
    </header>
  );
}
