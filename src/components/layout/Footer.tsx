"use client";

import Image from "next/image";
import Link from "next/link";
import { useRuntimeConfig } from "@/components/RuntimeConfigProvider";
import { Icon } from "@/components/ui/Icon";

export function Logo() {
  const { site } = useRuntimeConfig();
  const accentIndex = site.name.toLowerCase().lastIndexOf("node");
  const primaryName = accentIndex > 0 ? site.name.slice(0, accentIndex) : site.name;
  const accentName = accentIndex > 0 ? site.name.slice(accentIndex) : "";
  return (
    <Link className="logo" href="/#trang-chu" aria-label={`${site.name} - Trang chủ`}>
      <Image alt="" aria-hidden="true" className="logo-image" height={64} priority src="/assets/image/logo.png?v=2" unoptimized width={64} />
      <span>{primaryName}<strong>{accentName}</strong></span>
    </Link>
  );
}

export function Footer() {
  const { business, site } = useRuntimeConfig();
  const legalLinks = [
    { label: "Điều khoản dịch vụ", href: site.legal.termsUrl },
    { label: "Bảo hành và hoàn tiền", href: site.legal.warrantyUrl },
    { label: "Quyền riêng tư", href: site.legal.privacyUrl },
    { label: "Sử dụng tài nguyên", href: site.legal.resourceUrl },
  ];

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <div className="footer-contact">
            <a href={site.contact.discordUrl} target="_blank" rel="noreferrer"><Icon name="headphones" /> Discord hỗ trợ</a>
            <a href={site.contact.facebookUrl} target="_blank" rel="noreferrer"><Icon name="user" /> Facebook</a>
            <a href={`tel:${site.contact.phone}`}><Icon name="phone" /> {site.contact.phone}</a>
            <a href={`mailto:${site.contact.email}`}><Icon name="mail" /> {site.contact.email}</a>
            <span><Icon name="clock" /> Giờ hỗ trợ: {business.supportHours}</span>
          </div>
        </div>
        <div>
          <h2 className="footer-title">Chính sách</h2>
          <div className="footer-links">
            {legalLinks.map((link) => <Link key={link.label} href={link.href}>{link.label}</Link>)}
          </div>
        </div>
      </div>
      <div className="container footer-bottom"><span>© 2026 {site.name}. All rights reserved.</span></div>
    </footer>
  );
}
