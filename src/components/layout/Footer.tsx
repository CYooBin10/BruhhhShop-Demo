import Image from "next/image";
import Link from "next/link";
import { businessConfig } from "@/config/business";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/Icon";

export function Logo() {
  return (
    <Link className="logo" href="/#trang-chu" aria-label="DiabloNode - Trang chủ">
      <Image alt="" aria-hidden="true" className="logo-image" height={64} priority src="/assets/image/logo.png?v=2" unoptimized width={64} />
      <span>Diablo<strong>Node</strong></span>
    </Link>
  );
}

export function Footer() {
  const legalLinks = [
    { label: "Điều khoản dịch vụ", href: siteConfig.legal.termsUrl },
    { label: "Bảo hành và hoàn tiền", href: siteConfig.legal.warrantyUrl },
    { label: "Quyền riêng tư", href: siteConfig.legal.privacyUrl },
    { label: "Sử dụng tài nguyên", href: siteConfig.legal.resourceUrl },
  ];

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <div className="footer-contact">
            <a href={siteConfig.contact.discordUrl} target="_blank" rel="noreferrer"><Icon name="headphones" /> Discord hỗ trợ</a>
            <a href={siteConfig.contact.facebookUrl} target="_blank" rel="noreferrer"><Icon name="user" /> Facebook</a>
            <a href={`tel:${siteConfig.contact.phone}`}><Icon name="phone" /> {siteConfig.contact.phone}</a>
            <a href={`mailto:${siteConfig.contact.email}`}><Icon name="mail" /> {siteConfig.contact.email}</a>
            <span><Icon name="clock" /> Giờ hỗ trợ: {businessConfig.supportHours}</span>
          </div>
        </div>
        <div>
          <h2 className="footer-title">Chính sách</h2>
          <div className="footer-links">
            {legalLinks.map((link) => <Link key={link.label} href={link.href}>{link.label}</Link>)}
          </div>
        </div>
      </div>
      <div className="container footer-bottom"><span>© 2026 DiabloNode. All rights reserved.</span></div>
    </footer>
  );
}
