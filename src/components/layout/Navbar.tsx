"use client";

import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/layout/Footer";
import { useRuntimeConfig } from "@/components/RuntimeConfigProvider";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

type NavbarProps = {
  onAuth: (mode: "login" | "register") => void;
};

export function Navbar({ onAuth }: NavbarProps) {
  const { navigation } = useRuntimeConfig();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#trang-chu");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = navigation
      .filter(({ href }) => href.startsWith("#"))
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
  }, [navigation]);

  useEffect(() => {
    let active = true;
    let subscription: { unsubscribe: () => void } | undefined;
    const loadAuth = () => {
      void import("@/lib/supabase").then(({ supabase }) => {
        if (!active || !supabase) return;
        void supabase.auth.getUser().then(({ data }) => {
          if (active) setUser(data.user);
        });
        subscription?.unsubscribe();
        subscription = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
        }).data.subscription;
      });
    };
    const hasStoredSession = Object.keys(window.localStorage).some((key) => key.startsWith("sb-") && key.endsWith("-auth-token"));
    if (hasStoredSession) loadAuth();
    window.addEventListener("bruhhh-auth-changed", loadAuth);
    return () => {
      active = false;
      window.removeEventListener("bruhhh-auth-changed", loadAuth);
      subscription?.unsubscribe();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const getNavigationHref = (href: string) => pathname === "/" || !href.startsWith("#") ? href : `/${href}`;
  const isNavigationActive = (href: string) => href.startsWith("#") ? pathname === "/" && activeSection === href : pathname.startsWith(href);
  const signOut = async () => {
    const { supabase } = await import("@/lib/supabase");
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (!error) setUser(null);
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container nav-shell">
        <Logo />
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Điều hướng chính">
          {navigation.map((item) => (
            <span className="nav-item-with-notice" key={item.href}><a className={isNavigationActive(item.href) ? "is-active" : ""} href={getNavigationHref(item.href)} onClick={closeMenu}>{item.label}</a>{item.label === "Liên hệ" ? <NotificationBell /> : null}</span>
          ))}
        </nav>
        <div className="nav-actions">
          {user ? <UserAccount username={user.user_metadata.username || "Tài khoản"} email={user.email ?? ""} onSignOut={() => void signOut()} /> : <><button className="auth-link" type="button" onClick={() => onAuth("login")}>Đăng nhập</button><button className="button button-small button-primary auth-register" type="button" onClick={() => onAuth("register")}>Đăng ký</button></>}
          <ThemeToggle />
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? "Đóng menu" : "Mở menu"} onClick={() => setMenuOpen((open) => !open)}><Icon name={menuOpen ? "close" : "menu"} /></button>
        </div>
      </div>
      <div id="main-navigation" className={`mobile-nav ${menuOpen ? "is-open" : ""}`}>
        {navigation.map((item) => <a className={isNavigationActive(item.href) ? "is-active" : ""} href={getNavigationHref(item.href)} key={item.href} onClick={closeMenu}>{item.label}</a>)}
        {user ? <UserAccount username={user.user_metadata.username || "Tài khoản"} email={user.email ?? ""} mobile onSignOut={() => { closeMenu(); void signOut(); }} /> : <div className="mobile-auth-actions"><button className="button button-ghost" type="button" onClick={() => { closeMenu(); onAuth("login"); }}>Đăng nhập</button><button className="button button-primary" type="button" onClick={() => { closeMenu(); onAuth("register"); }}>Đăng ký</button></div>}
      </div>
    </header>
  );
}

function NotificationBell() {
  const { site } = useRuntimeConfig();
  const [open, setOpen] = useState(false);
  const noticeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: MouseEvent) => {
      if (!noticeRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", closeOutside);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("mousedown", closeOutside);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, [open]);

  return <div ref={noticeRef} className="notice-control"><button className="notice-trigger" type="button" aria-expanded={open} aria-label="Mở thông báo" onClick={() => setOpen((current) => !current)}><Icon name="bell" />{site.notifications.length > 0 ? <i /> : null}</button>{open ? <div className="notice-panel"><strong>Thông báo</strong>{site.notifications.length > 0 ? site.notifications.map((notice) => <div className="notice-item" key={notice.id}><b>{notice.title}</b><p>{notice.message}</p></div>) : <p className="notice-empty">Chưa có thông báo mới.</p>}</div> : null}</div>;
}

type UserAccountProps = {
  email: string;
  mobile?: boolean;
  onSignOut: () => void;
  username: string;
};

function UserAccount({ email, mobile = false, onSignOut, username }: UserAccountProps) {
  const [open, setOpen] = useState(false);
  const isAdmin = email.trim().toLowerCase() === "tranhuybao000@gmail.com";
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: MouseEvent) => {
      if (!accountRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", closeOutside);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("mousedown", closeOutside);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, [open]);

  return <div ref={accountRef} className={`account-user ${mobile ? "mobile-account" : ""}`}><button className="account-trigger" type="button" aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen((current) => !current)}><span className="account-avatar"><Icon name="user" /></span><span className="account-copy"><strong>{username}</strong><small>{email}</small></span><Icon name="chevron-down" /></button>{open ? <div className="account-menu" role="menu">{isAdmin ? <Link className="account-admin" href="/admin" role="menuitem" onClick={() => setOpen(false)}>Admin</Link> : null}<button disabled type="button" role="menuitem">Dashboard</button><button disabled type="button" role="menuitem">Thông tin cá nhân</button><button disabled type="button" role="menuitem">Lịch sử mua</button><button className="account-signout" type="button" role="menuitem" onClick={onSignOut}>Đăng xuất</button></div> : null}</div>;
}
